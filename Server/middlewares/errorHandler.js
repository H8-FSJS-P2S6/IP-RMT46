module.exports = (error, req, res, next) => {
    console.log(error, "<<<<<<<<< from errorHandler")
    let status = error.status || 500;
    let message = error.message || "Internal Server Error";

    switch (error.name) {
        case "JsonWebTokenError":
        case "Unauthenticated":
            status = 401
            message = "Invalid token"
            break;
        case "CustomError":
            status = 401
            message = "Invalid email or password"
            break;
        case "Unauthorized":
            status = 403
            message = "Forbidden"
            break;
        case "Not found":
            status = 404
            message = `Data not found`
            break;
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
             status = 400
             message = error.errors[0].message
             break;
        case "CustomEmailError":
            status = 400
            message = "Email is required"
            break;
        case "CustomPasswordError":
            status = 400
            message = "Password is required"
            break;
        case "CustomFileError":
            status = 400
            message = "Image file is required"
            break;
        case "CustomPurchaseError":
            status = 400
            message = "Burger has been purchased"
            break;
        default:
            break;
    }

    res.status(status).json({message: message, error});
}