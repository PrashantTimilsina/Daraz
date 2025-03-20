class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.status}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStack(this, this.constructor);
  }
}
module.exports = AppError;
