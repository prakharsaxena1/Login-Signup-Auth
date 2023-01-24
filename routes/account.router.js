// Dependencies
const express = require("express");
const router = express.Router();
const accountController = require('../controllers/account.controller')

// Routes [ACCOUNT]
router.route('/login')
    .get(accountController.LoginPage)
    .post(accountController.accountLogin);
router.route('/register')
    .get(accountController.RegisterPage)
    .post(accountController.accountRegister);

// DEV ONLY
router.route('/dev').get(accountController.getAllUsers)


// Exports
module.exports = router;