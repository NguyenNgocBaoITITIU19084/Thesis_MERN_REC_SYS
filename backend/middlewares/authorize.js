const ApiError = require("../utils/ApiError");

exports.authorize = (roles) => (req, res, next) => {
  const UserRole = req.user.roles;
  if (!UserRole) {
    throw new ApiError(403, "No Permission");
  }
  let isOut = true;
  for (var i = 0; i < roles.length; i++) {
    if (UserRole.includes(roles[i])) {
      isOut = false;
      next();
      break;
    }
  }
  if (isOut) {
    throw new ApiError(403, "No Permission");
  }
};
