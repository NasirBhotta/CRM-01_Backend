const { CustomApiError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandleMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
  if (err.code == 11000) {
    console.log(err);
    return res.status(StatusCodes.CONFLICT).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: err.message });
};

module.exports = errorHandleMiddleware;
