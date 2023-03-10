// Dependencies
const express = require("express");
const passport = require("passport");
const router = express.Router();
const accountController = require('../controllers/account.controller')

// Routes [ACCOUNT]
router.route('/login')
    .get(accountController.LoginPage)
    .post((req, res) => {
        res.redirect('/login-success');
    });
router.route('/register')
    .get(accountController.RegisterPage)
    .post(accountController.accountRegister);

// DEV ONLY
router.route('/dev').get(accountController.getAllUsers)


router.get('/', (req, res) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get('/protected-route', (req, res) => {
    res.send('Check auth then decide visit this page or not');
});

router.get('/logout', (req, res, next) => {
    res.send('User logout');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('<H1>You entered the wrong password.</H1><p>Please <a href="/login">login</a> with correct password</p>');
});

// Exports
module.exports = router;