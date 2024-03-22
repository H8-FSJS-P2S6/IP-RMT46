async function authorizationAdmin(req, res, next) {
    try {
        if (req.user.role !== "Admin") {
            throw { name: "Unauthorized" }
        }
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = authorizationAdmin;