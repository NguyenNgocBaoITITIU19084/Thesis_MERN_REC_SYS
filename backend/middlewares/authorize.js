const ApiError = require("../utils/ApiError");

exports.authorize = (roles) => (req, res, next) => {
  const UserRole = req.user.roles;
  if (!UserRole) {
    throw new ApiError(403, "No Permission");
  }
  let isOut = true;
  roles.map((role) => {
    const check = UserRole.includes(role);
    if (check) {
      isOut = false;
      next();
    }
  });
  if (isOut) {
    throw new ApiError(403, "No Permission");
  }
};
