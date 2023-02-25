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


router.get('/', (req, res) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get('/protected-route', (req, res) => {
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
});

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('<H1>You entered the wrong password.</H1><p>Please <a href="/login">login</a> with correct password</p>');
});

// Exports
module.exports = router;