const express = require('express')

// controller functions
const { 
    signupUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser 
 } = require('../controllers/userController')
 const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// add user
router.post('/signup', signupUser)

// protect all routes except signup
// HUOM! Kommentoi seuraava rivi jos haluat muuttaa ensimmäisen rekisteröityneen käyttäjän adminiksi!!
router.use(requireAuth)

// get user
router.get('/:id', getUser)

// get users
router.get('/', getUsers)

// edit user
router.patch('/:id', updateUser)

// remove user
router.delete('/:id', deleteUser)

module.exports = router