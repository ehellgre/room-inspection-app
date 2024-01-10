const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createAccessToken = (_id) => {
    return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900 })
}
const createRefreshToken = (_id) => {
    return jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'})
}

// login user
const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create tokens
        const accessToken = createAccessToken(user._id.toJSON())
        const refreshToken = createRefreshToken(user._id.toJSON()) 

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            //secure: true,
            //sameSite: 'None',
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //secure: true,
            //sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const firstName = user.firstName
        const lastName = user.lastName
        const role = user.role
        const _id = user._id

        res.status(200).json({_id, email, firstName, lastName, role})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get new access token
const refresh = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.refreshToken) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const refreshToken = cookies.refreshToken

    try {
        const {_id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({ _id }).select('_id')
    
        if(user) {
            const accessToken = jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 900})
            
            return accessToken
        }

    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            console.log('refresh token vanhentunut => logout')
            logout(req, res)
        } else {
            res.status(401).json({error: 'Unauthorized'})
        }
    }
}  

// logout user
const logout = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.accessToken || !cookies?.refreshToken) {
        return res.sendStatus(204) // No content
    }
    
    res.clearCookie('refreshToken', { httpOnly: true, /*sameSite: 'None', secure: true*/ })
    res.clearCookie('accessToken', { httpOnly: true, /*sameSite: 'None', secure: true*/ })
    res.json({ message: 'Logged out' })
}

// check if refresh token is valid or not
const checkRefreshToken = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.refreshToken) {
        return res.status(200).json({message: 'Token not found'})
    }

    const refreshToken = cookies.refreshToken

    try {
        const {_id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findOne({ _id }).select('_id')
    
        if(user) {
            res.status(200).json({message: 'Token is valid'})
        }

    } catch (error) {
        console.log(error)
        if (error.name === 'TokenExpiredError') {
            res.status(200).json({message: 'Token not valid'})
        }
    }
}

module.exports = { login, refresh, logout, checkRefreshToken }