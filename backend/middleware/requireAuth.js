const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const authController = require('../controllers/authController.js')

// use this method in routes which you want to protect from unauthorized users
// example in route file:
// const requireAuth = require('../middleware/requireAuth)
// after defining router =>
// router.use(requireAuth)
// => now requireAuth is called before api requests in that router file

const requireAuth = async (req, res, next) => {

    try {
        const accessToken = req.cookies?.accessToken

        const {_id} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        res.setHeader('Authorization', `Bearer ${accessToken}`)
        // console.log(req.user)
        // console.log('access token ok, no need to refresh')
        next()

    } catch (error) {
        // try to refresh access token
        try {
            const refreshToken = req.cookies?.refreshToken
            if(refreshToken) {
                console.log('access token expired => new access token with refresh token')
                const newAccessToken = await authController.refresh(req, res)
                // console.log(newAccessToken)
                if (newAccessToken) {
                    res.cookie("accessToken", newAccessToken, {
                        httpOnly: true,
                        //secure: true,
                        //sameSite: 'None',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })
                    res.setHeader('Authorization', `Bearer ${newAccessToken}`)
                    next()
            }
        }} catch (error) {
                res.status(401).json({error: 'Unauthorized'})
        }
    }
}

module.exports = requireAuth