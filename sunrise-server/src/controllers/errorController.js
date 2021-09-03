const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: 'Ops... Algo de errado aconteceu :(',
  });
};

module.exports = (err, req, res, next) => {
  const error = Object.assign(err);

  error.statusCode = err.statusCode ? err.statusCode : 500;
  error.status = err.status ? err.status : 'error';

  if (process.env.NODE_ENV === 'development') return sendDevError(error, res);

  sendProdError(error, res);
};
