const cloudinary = require("cloudinary").v2;

const catchAsync = require("../middlewares/catchAsync");
const ApiError = require("../utils/ApiError");
const ResultObject = require("../utils/ResultObject");

const productSchema = require("../models/ProductsModel");
const discountSchema = require("../models/DiscountsModel");
const { STATUS_CODE } = require("../contants/statusCode");
const message = require("../config/Messages");

exports.createProduct = catchAsync(async (req, res) => {
  const {
    name,
    price,
    actualPrice,
    description,
    images,
    discountApplied,
    brand,
    categories,
  } = req.body;
  const { store: storeId } = req.user;
  if (discountApplied) {
    const discount = await discountSchema.findById({ _id: discountApplied });
    if (!discount) {
      throw new ApiError(
        400,
        message.models.not_founded + message.models.discount
      );
    }
    const { persentDiscount } = discount;
    const newPrice = price - (price * persentDiscount) / 100;
    const product = await productSchema.create({
      name,
      price: newPrice,
      actualPrice,
      description,
      images,
      discountApplied,
      brand,
      categories,
      createdBy: storeId,
    });
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.success_create + message.models.product,
          product
        )
      );
  }

  const product = await productSchema.create({
    name,
    price,
    actualPrice,
    description,
    images,
    brand,
    categories,
    createdBy: storeId,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.product,
        product
      )
    );
});

exports.getAllproducts = catchAsync(async (req, res) => {
  const products = await productSchema
    .find()
    .populate("discountApplied")
    .populate("brand")
    .populate("categories")
    .populate("createdBy");
  if (!products) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        products
      )
    );
});

exports.getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productSchema
    .findById(id)
    .populate("discountApplied")
    .populate("brand")
    .populate("categories")
    .populate("createdBy");
  if (!product) {
    throw new ApiError(
      400,
      message.models.not_founded + message.models.product
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        product
      )
    );
});

exports.deleteProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { store: storeId } = req.user;
  if (!id) {
    throw new ApiError(400, "Not Found Product Id");
  }
  if (!storeId) {
    throw new ApiError(403, "Forbiden");
  }
  const productDetail = await productSchema.find({
    _id: id,
    createdBy: storeId,
  });
  if (!productDetail.length) {
    throw new ApiError(404, message.models.not_founded);
  }
  const [productSelect] = productDetail;
  productSelect.images.forEach((image) => {
    cloudinary.uploader.destroy(image.fileName, function (err, res) {
      if (err) {
        throw new ApiError(400, err);
      }
    });
  });
  const product = await productSchema.findByIdAndDelete({
    _id: id,
    createdBy: storeId,
  });
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_delete + message.models.product,
        product
      )
    );
});

exports.updateProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    actualPrice,
    description,
    images,
    discountApplied,
    brand,
    categories,
  } = req.body;
  const { store: storeId } = req.user;
  const checkingProduct = await productSchema.findById(id);
  if (!storeId.equals(checkingProduct.createdBy)) {
    throw new ApiError(403, "No Permition");
  }
  const product = await productSchema.findByIdAndUpdate(
    id,
    {
      name,
      price,
      actualPrice,
      description,
      images,
      discountApplied,
      brand,
      categories,
    },
    { new: true }
  );
  if (!product) {
    throw new ApiError(
      400,
      message.models.not_founded + message.models.product
    );
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.product,
        product
      )
    );
});

// authenticated
exports.getProductsByStoreId = catchAsync(async (req, res) => {
  const { store: storeId } = req.user;
  if (!storeId) {
    throw new ApiError(403, "Forbiden");
  }
  const products = await productSchema.find({ createdBy: storeId });
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_update + message.models.product,
        products
      )
    );
});

exports.getAllproductsByAdmin = catchAsync(async (req, res) => {
  const products = await productSchema
    .find()
    .populate("discountApplied")
    .populate("brand")
    .populate("categories")
    .populate("createdBy");
  if (!products) {
    throw new ApiError(400, message.models.not_founded);
  }
  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        products
      )
    );
});

exports.createProductByAdmin = catchAsync(async (req, res) => {
  const {
    name,
    price,
    actualPrice,
    description,
    images,
    discountApplied,
    brand,
    categories,
  } = req.body;
  const { store: AdminId } = req.user;
  if (discountApplied) {
    const discount = await discountSchema.findById({ _id: discountApplied });
    if (!discount) {
      throw new ApiError(
        400,
        message.models.not_founded + message.models.discount
      );
    }
    const { persentDiscount } = discount;
    const newPrice = price - (price * persentDiscount) / 100;
    const product = await productSchema.create({
      name,
      price: newPrice,
      actualPrice,
      description,
      images,
      discountApplied,
      brand,
      categories,
      createdBy: AdminId,
    });
    return res
      .status(201)
      .json(
        new ResultObject(
          STATUS_CODE.SUCCESS,
          message.models.success_create + message.models.product,
          product
        )
      );
  }

  const product = await productSchema.create({
    name,
    price,
    actualPrice,
    description,
    images,
    brand,
    categories,
    createdBy: AdminId,
  });
  return res
    .status(201)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_create + message.models.product,
        product
      )
    );
});

exports.getAllProductByStoreId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const products = await productSchema.find({ createdBy: id });

  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        products
      )
    );
});

exports.setActiveProductByAdmin = catchAsync(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, "Missing field");
  }
  const existedProduct = await productSchema.find({ _id: productId }).lean();
  if (!existedProduct) {
    throw new ApiError(404, "Not Found Product");
  }

  const updateProduct = await productSchema.findByIdAndUpdate(
    { _id: productId },
    {
      isActive: !existedProduct[0].isActive,
    }
  );

  return res
    .status(200)
    .json(
      new ResultObject(
        STATUS_CODE.SUCCESS,
        message.models.success_query + message.models.product,
        updateProduct
      )
    );
});
