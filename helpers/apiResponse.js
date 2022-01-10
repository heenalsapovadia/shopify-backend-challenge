exports.successResponseWithData = (res, msg, data, statusCode) => {
  return res.status(statusCode || 201).json({
    message: msg,
    item: data,
  });
};

exports.errorResponse = (res, error, msg) => {
  return res.status(500).json({
    message: msg,
    error: error.message,
  });
};

exports.notFoundResponse = (res, msg) => {
  return res.status(404).json({
    message: msg,
  });
};
