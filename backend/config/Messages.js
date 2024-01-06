const messages = {
  mongoose: {
    success: "Successfully Connect to Mongo Database",
    failed: "Failed to Connect to Mongoo Database",
    error: "Error from Mongo Database",
  },
  email_config: {
    success: "Success config the email service",
    failed: "",
  },
  server: {
    success: "Server running on PORT:",
    url: "http://localhost:",
  },
  models: {
    not_founded: "Not Found",
    not_yet: "There are no",
    success_create: "Successfully Create",
    success_delete: "Successfully Delete",
    success_query: "Successfully Query",
    success_update: "Successfully Update",
    category: " Category Model",
    brand: " Brand Model",
    discount: " Discount Model",
    product: " Product Model",
    comment: " Comment Model",
    user: " User Model",
    profile: " Profile Model",
    store: " Store Model",
    whishList: " WhishList Model",
    cartList: " CartList Model",
  },
  error: {
    user_not_existed: "User doest not existed",
    notMatchedPass: "Password doest not existed",
    notExistedRefeshToken: "The Refesh Token doest not existed",
    already_existed: "Already existed",
    register: "user already existed",
    missing_fields: "Missing Fields",
    login: {
      inValid_input: "email or password is not valid",
    },
    resetPassword: {
      inValidToken: "Invalid Token",
    },
  },
  uploadCloudinary: {
    success: "success to upload images to cloudinary",
    failed: "failed to upload images to cloudinary",
  },
  removeCloudinary: {
    success: "success to remove images to cloudinary",
    failed: "failed to remove images to cloudinary",
  },
  readData: {
    success: "success read data csv",
  },
};

module.exports = messages;
