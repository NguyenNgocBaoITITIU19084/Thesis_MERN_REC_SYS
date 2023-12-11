const bcrypt = require("bcryptjs");

exports.hashString = (hashString) => {
  const salt = bcrypt.genSaltSync();
  const hashedToken = bcrypt.hashSync(hashString, salt);
  return hashedToken;
};
