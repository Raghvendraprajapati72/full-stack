const errorMiddleware = (
  err,
  req,
  res,
  next
) => {

  console.log(err);

  res.status(500).json({

    success: false,

    msg:
      err.message ||
      "Server Error",
  });
};

export default errorMiddleware;