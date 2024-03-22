const bcrypt = require('bcryptjs')

module.exports = {
    hashPasswd: (password) => bcrypt.hashSync(password, 10),
    comparepaswd: (password) => bcrypt.compareSync(password, this.hashPasswd)
}