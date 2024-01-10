const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

// functions for creating tokens
const createAccessToken = (_id) => {
    return jwt.sign({_id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 900})
}
const createRefreshToken = (_id) => {
    return jwt.sign({_id}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d'})
}

// create user
const signupUser = async (req, res) => {
    const {firstName, lastName, email, password, passwordVerify} = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password, passwordVerify)

        // create tokens
        const accessToken = createAccessToken(user._id.toJSON())
        const refreshToken = createRefreshToken(user._id.toJSON()) 

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            //secure: true,
            //sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            //secure: true,
            //sameSite: 'None'
        })

        const firstNameD = user.firstName
        const lastNameD = user.lastName
        const role = user.role
        const _id = user._id

        res.status(200).json({_id, email, firstName: firstNameD, lastName: lastNameD, role})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get users
const getUsers = async (req, res) => {
    
    const users = await User.find({}).select('firstName lastName email role')

    res.status(200).json(users)
}

// get user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'User not found'})
    }

    const user = await User.findById(id).select('firstName lastName email role')

    if (!user) {
        return res.status(404).json({error: 'User not found'})
    }

    res.status(200).json(user)
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'User not found'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(400).json({error: 'User not found'})
    }

    res.status(200).json({message: 'User deleted'})
}

// update user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'User not found'})
    }

    const updatedFields = {}
    if (req.body.role && req.body.role !== '') {
        const allowedRoles = ['admin', 'student', 'staff']
        if (allowedRoles.includes(req.body.role)) {
            updatedFields.role = req.body.role
        } else {
            return res.status(400).json({error: 'Invalid role'})
        }
    }
    if (req.body.firstName && req.body.firstName !== '') {
        updatedFields.firstName = req.body.firstName;
    }
    if (req.body.lastName && req.body.lastName !== '') {
        updatedFields.lastName = req.body.lastName;
    }
    if (req.body.password && req.body.password !== '') {
        if (validator.isStrongPassword(req.body.password)) {
            const hash = await bcrypt.hash(req.body.password, 10)
            updatedFields.password = hash
        }
        else if (!validator.isStrongPassword(req.body.password)) {
            return res.status(400).json({error: 'Liian heikko salasana'})
        }
    }

    const user = await User.findOneAndUpdate({_id: id}, updatedFields)

    if (!user) {
        return res.status(400).json({error: 'Update failed'})
    }

    res.status(200).json({message: 'User updated'})
}

module.exports = {
    signupUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser 
}