module.exports = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "SequelzeUniqueConstraintError":
    case "SequelizeValidationError":
    case "BadRequest":
      status = 400;
      message = error.errors[0].message;
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Unauthorized":
      status = 403;
      message = "Forbidden";
      break;
    case "Not Found":
      status = 404;
      message = "Not Found";
      break;
    default:
      break;
  }

  res.status(status).json({ message: message });
};
