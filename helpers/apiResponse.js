exports.successResponseWithData = (res, msg, data, statusCode) => {
  return res.status(statusCode || 201).json({
    message: msg,
    item: data,
  });
};

exports.errorResponse = (res, error, msg, statusCode) => {
  return res.status(statusCode || 500).json({
    message: msg,
    error: error,
  });
};

exports.notFoundResponse = (res, msg) => {
  return res.status(404).json({
    message: msg,
  });
};
