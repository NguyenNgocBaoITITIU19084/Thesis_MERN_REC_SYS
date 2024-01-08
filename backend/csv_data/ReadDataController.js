const fs = require("fs");
const csv = require("csv-parser");
const axios = require("axios");

const catchAsync = require("../middlewares/catchAsync");
const usersSchema = require("../models/UserModel");
const storeSchema = require("../models/StoresModel");
const categorySchema = require("../models/CategoriesModel");
const productSchema = require("../models/ProductsModel");
const profileSchema = require("../models/ProfilesModel");
const whishListSchema = require("../models/WhishListModel");
const cartListSchema = require("../models/CartListModel");

exports.ReadCSVDataFile_Category = catchAsync(async (req, res) => {
  const results = [];
  const removeChar = [];
  let finalArr = [];
  fs.createReadStream("csv_data/amazon.csv")
    .pipe(csv())
    .on("data", (data) => {
      const { category } = data;
      const newCategory = category.split("|");
      results.push(...newCategory);
    })
    .on("end", async () => {
      results.map((item) => {
        removeChar.push(...item.split("&"));
      });

      const uniq = [...new Set(removeChar)];
      const resultCategories = await uniq.reduce(async (memo, v) => {
        const results = await memo;
        const data = { name: v, description: v };
        try {
          const res = await axios.post(
            `http://localhost:5000/api/v1/category/`,
            data
          );
          return [...results, res];
        } catch (error) {
          console.log(error);
        }
      }, []);

      return res.json({ status: "done" });
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
});

exports.ReadCSVDataFile_product = catchAsync(async (req, res) => {
  const results = [];
  const results2 = [];

  const removeChar = [];
  let finalArr = [];
  fs.createReadStream("csv_data/amazon.csv")
    .pipe(csv())
    .on("data", (data) => {
      const {
        product_name,
        about_product,
        actual_price,
        discounted_price,
        img_link,
        rating,
        category,
        rating_count,
      } = data;
      const removeFisrtAcPrice = actual_price.slice(1);
      const removeSecondAcPrice = removeFisrtAcPrice.replace(/,/g, "");
      const removeFirstDisPrice = discounted_price.slice(1);
      const removeSecondDisprice = removeFirstDisPrice.replace(/,/g, "");

      const sold_out = rating_count.replace(/,/g, "");

      const newCategory = category.split("|");
      results.push({
        name: product_name,
        description: about_product,
        actualPrice: +removeSecondAcPrice,
        price: +removeSecondDisprice,
        images: [{ link: img_link, fileName: null }],
        total_rating: +rating,
        categories: newCategory,
        soldOut: +sold_out,
        createdBy: null,
      });
    })
    .on("end", async () => {
      var size = 100;
      var arrayOfArrays = [];
      for (var i = 0; i < results.length; i += size) {
        arrayOfArrays.push(results.slice(i, i + size));
      }
      const storeData = await storeSchema.find();
      const categoriesData = await categorySchema.find();
      console.log(categoriesData["name"] === "Computers");
      for (var i = 0; i < arrayOfArrays.length; i += 1) {
        arrayOfArrays[i].map((item) => {
          let cateId = [];
          let newCatesplited = [];
          item.createdBy = storeData[i]._id;
          item.categories.map((item) => {
            const newItem = item.split("&");
            newCatesplited.push(newItem);
          });
          item.categories = newCatesplited.flat(Infinity);
          item.categories.map((item) => {
            categoriesData.map((cate) => {
              if (cate.name === item) {
                return cateId.push(cate._id);
              }
            });
          });
          item.categories = cateId.flat(Infinity);
        });
      }
      const resultUser = await arrayOfArrays.reduce(async (memo, v) => {
        const results = await memo;
        try {
          const product = await productSchema.create(v);
          return [...results];
        } catch (error) {
          console.log(error);
        }
      }, []);
      res.json(arrayOfArrays[0]);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
});

exports.ReadCSVDataFile_Users = catchAsync(async (req, res) => {
  const results = [];
  const removeChar = [];
  let finalArr = [];
  fs.createReadStream("csv_data/amazon.csv")
    .pipe(csv())
    .on("data", (data) => {
      const { user_id, user_name } = data;
      const SplitedUserList = user_id.split(",");
      const SplitedUserNameList = user_name.split(",");
      const uiqueUserList = [...new Set(SplitedUserList)];
      uiqueUserList.map((item, index) => {
        results.push({
          email: uiqueUserList[index],
          name: SplitedUserNameList[index],
        });
      });
    })
    .on("end", async () => {
      // const asyncRes = await Promise.all(
      //   results.map(async (i) => {
      //     const user = await usersSchema.create({
      //       email: i.email,
      //       password: "123123123",
      //     });
      //     return user;
      //   })
      // );
      const resultUser = await results.reduce(async (memo, v) => {
        const results = await memo;
        const data = { email: v.email + "@gmail.com", password: "123123123" };
        try {
          const res = await axios.post(
            `http://localhost:5000/api/v1/auth/register`,
            data
          );
          return [...results, res];
        } catch (error) {
          console.log(error);
        }
      }, []);

      return res.json({ status: "done" });
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
});
