require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    let token = req.header('Authorization').split(' ')[1]
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env['JWT_SECRET'])
            req.user = tokenData
            next()
        } catch (e) {
            res.json(e.message)
        }
    } else {
        res.status(401).json({
            errors: 'invalid token'
        })
    }
}

module.exports = authenticateUser
