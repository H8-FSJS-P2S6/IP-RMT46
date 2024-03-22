module.exports = (error, req, res, next) => {
    let status = error.status || 500
    let message = error.message || 'Internal server error'

    switch(error.name){
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = error.errors[0].message
            break
        case 'JsonWebTokenError':
        case 'Unauthenticated':
            status = 401
            message = 'Invalid Token'
            break
        case 'Unauthorized':
            status = 403
            message = 'Forbiden access'
            break
        case 'Not Found':
            status = 404
            message = 'Data not found'
            break
    }

    res.status(status).json({ message })
}