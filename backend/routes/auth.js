const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')

router.route('/login')
    .post(authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/')
    .get(authController.checkRefreshToken)

module.exports = router