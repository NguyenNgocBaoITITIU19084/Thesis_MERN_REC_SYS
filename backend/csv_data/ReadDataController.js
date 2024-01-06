const fs = require("fs");
const csv = require("csv-parser");
const catchAsync = require("../middlewares/catchAsync");

const categorySchema = require("../models/CategoriesModel");

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
    .on("end", () => {
      results.map((item) => {
        removeChar.push(...item.split("&"));
      });

      const uniq = [...new Set(removeChar)];
      uniq.map((item) => {
        finalArr.push({ name: item, description: item });
      });
      res.json(finalArr);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
});

exports.ReadCSVDataFile_product = catchAsync(async (req, res) => {
  const results = [];
  const removeChar = [];
  let finalArr = [];
  fs.createReadStream("csv_data/amazon.csv")
    .pipe(csv())
    .on("data", (data) => {
      const { product_name, about_product, actual_price } = data;
      const removeFisrtAcPrice = actual_price.slice(1);
      const removeSecondAcPrice = removeFisrtAcPrice.replace(/,/g, "");
      results.push({
        name: product_name,
        description: about_product,
        actualPrice: +removeSecondAcPrice,
      });
    })
    .on("end", () => {
      res.json(results);
      // [
      //   { NAME: 'Daffy Duck', AGE: '24' },
      //   { NAME: 'Bugs Bunny', AGE: '22' }
      // ]
    });
});
