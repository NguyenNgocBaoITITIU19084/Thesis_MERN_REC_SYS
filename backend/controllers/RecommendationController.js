const cloudinary = require("cloudinary").v2;
const axios = require("axios");

const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const productSchema = require("../models/ProductsModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.contentBased = catchAsync(async (req, res) => {
  const { name } = req.params;
  const listProductName = await axios.get(
    `http://127.0.0.1:5000/recommend/content?product_name=${name}`
  );
  let data = [];
  listProductName.data.recommendations.map((item) => {
    data.push({ name: item });
  });
  const resultProducts = await listProductName.data.recommendations.reduce(
    async (memo, v) => {
      const results = await memo;
      try {
        const res = await productSchema
          .findOne({ name: v })
          .populate("categories");
        return [...results, res];
      } catch (error) {
        console.log(error);
      }
    },
    []
  );
  if (!resultProducts[0]) {
    return res
      .status(200)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.success_query + message.models.product,
          null
        )
      );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        resultProducts
      )
    );
});
exports.Collaborative = catchAsync(async (req, res) => {
  const { email } = req.user;
  const userId = email.replace("@gmail.com", "");
  let result = [];
  await axios
    .get(`http://127.0.0.1:5000/recommend/collaborative?user_id=${userId}`)
    .then((res) => {
      result = [...res.data.recommendations];
    });
  let proName = [];
  result.map((item) => {
    proName.push(item[0]);
  });
  const resultProducts = await proName.reduce(async (memo, v) => {
    const results = await memo;
    try {
      const res = await productSchema
        .findOne({ name: v })
        .populate("categories");
      return [...results, res];
    } catch (error) {
      console.log(error);
    }
  }, []);
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        resultProducts
      )
    );
});
