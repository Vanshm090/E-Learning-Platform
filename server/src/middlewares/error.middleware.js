const errorMiddleware = (err, req, res, next) => {
  return res.status(err.statuscode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};
export default errorMiddleware;
