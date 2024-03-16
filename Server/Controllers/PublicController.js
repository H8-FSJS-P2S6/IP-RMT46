const {Product} = require("../models")
class PublicController{
    static async getAllProduct(req, res, next) {
        try {
            let {search} = req.query
            let whereCondition = {}
            if (search) {
                whereCondition.name = {
                    [Op.like]: `%${search}%`
                }
            }

           const data = await Product.findAll({
            where: whereCondition
           })

           res.status(200).json(data)
        }catch (error) {
            next(error)
        }
    }

    static async getAllProductById(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)
            if(!product){
                throw {
                    name: "NotFound",
                }
            }else{
                res.status(200).json(product)
            }
        }catch (error) {
            next(error)
        }
    }

}

module.exports = PublicController