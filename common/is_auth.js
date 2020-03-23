var { User } = require('../mongoose')
const jwt = require('jsonwebtoken')
const SECRET = 'ewgfvwedfhsghdahjggvsvsd'
module.exports = async function auth(req,res,next) {
    const raw = String(req.get("Authorization")).split(' ').pop();
    const {id} = jwt.verify(raw,SECRET)
    req.user = await User.findById(id)
    next()
}