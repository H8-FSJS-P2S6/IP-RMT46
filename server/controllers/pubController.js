const axios = require('axios')

module.exports = class Controller {
    static async getData(req, res, next) {
        try {
            const response = await axios.get('https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=5&page=1')

            // console.log(response.data)

            res.status(200).json(response.data)

        } catch (error) {
            next(error)
        }
    }

    static async getDataById(req, res, next) {
        try {
            const id = req.params.id
            let { language } = req.query

            if (!language) {
                language = `en`
                // language translation: ar, en, fr, es, tr, ur, id, bs, ru, bn, zh, fa, hi, vi, si, ug
                // console.log(language)
            }

            const response = await axios.get(`https://hadeethenc.com/api/v1/hadeeths/one/?language=${language}&id=${id}`)

            // console.log(response.data)

            res.status(200).json(response.data)
        } catch (error) {
            next(error)
        }
    }
}