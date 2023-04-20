const partnerErrorHandler =
  //default express error handler
  (
    err,
    req,
    res
    //further middleware
    // next
  ) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    res.json({
      message: err.message,
      // stack: process.env.NODE_ENV === 'test' ? null : err.stack,
    });
  };

module.exports = {
  partnerErrorHandler,
};
