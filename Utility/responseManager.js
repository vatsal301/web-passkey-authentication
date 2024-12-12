const logger = require("../logger");

const responseManager = {
  Success: (h, message, data = {}, statusCode = 200) => {
    const response = {
      status: "success",
      message: message,
      data: data,
    };
    logger.info(`Success: ${message}, statusCode: ${statusCode}`);

    return h.response(response).code(statusCode);
  },
  Error: (h, message, error = {}, statusCode = 500) => {
    // if (error.length) ;
    const response = {
      status: "error",
      message: message,
      error: error,
    };
    logger.error(`Error: ${message}, statusCode: ${statusCode}`);
    return h.response(response).code(statusCode);
  },
  ValidationError: (h, message, details = {}, statusCode = 400) => {
    const response = {
      status: "fail",
      message,
      details,
    };
    logger.error(`Error: ${message}, statusCode: ${statusCode}`);
    return h.response(response).code(statusCode);
  },
  FailAction: (request, h, err) => {
    return responseManager
      .ValidationError(h, "Validation failed", err.details, 400)
      .takeover();
  },
};

module.exports = responseManager;
