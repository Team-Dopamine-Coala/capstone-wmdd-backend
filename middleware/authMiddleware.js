const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({error: 'User not authorized'})
        }
    }

    if(!token) {
        return res.status(401).json({error: 'User not authorized, no token exists'})
    }
}

module.exports = {
    protect
}