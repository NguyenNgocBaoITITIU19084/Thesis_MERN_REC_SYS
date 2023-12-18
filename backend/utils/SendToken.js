// create token and saving that in cookies
const sendToken = (token, statusCode, res) => {
  // const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token.accessToken, options).json({
    success: true,
    token,
  });
};

module.exports = sendToken;
