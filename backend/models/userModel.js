const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'staff', 'student'],
        default: 'student'
    },
    password: {
        type: String,
        required: true
    } /*,
    accessTokenIdentifier: {
        type: String
    },
    refreshTokenIdentifier: {
        type: String
    } */
})

// static signup method
userSchema.statics.signup = async function (firstName, lastName, email, password, passwordVerify) {

    // validation
    if (!email || !password) {
        throw Error('Kaikki kentät tulee täyttää')
    }
    if (!validator.isEmail(email)) {
        throw Error('Sähköpostiosoite on väärin')
    }
    if (!email.endsWith('@edu.lapinamk.fi') && !email.endsWith('@lapinamk.fi')) {
        throw Error('Voit rekisteröityä vain Lapin AMK:n sähköpostiosoitteella')
    }
    if (password !== passwordVerify) {
        throw Error('Syötä sama salasana kaksi kertaa')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Salasana ei ole tarpeeksi vahva')
    }


    const exists = await this.findOne({ email })

    // if already signed up with this email
    if (exists) {
        throw Error('Antamallasi sähköpostiosoitteella löytyy jo käyttäjä')
    }

    // hashing password
    const hash = await bcrypt.hash(passwordVerify, 10)
    const user = await this.create({ firstName, lastName, email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    
    // validation
    if (!email || !password) {
        throw Error('Kaikki kentät tulee täyttää')
    }

    const user = await this.findOne({ email })

    // if email not in db
    if (!user) {
        throw Error('Kirjautuminen epäonnistui')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Kirjautuminen epäonnistui')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)