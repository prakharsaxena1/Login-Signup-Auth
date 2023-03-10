const User = require('../models/user.model');

// ACCOUNT MANAGEMENT
const LoginPage = (req, res) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
};

const RegisterPage = (req, res) => {
    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="password" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
};

const accountRegister = async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    try {
        if (user !== null) {
            return new Error('Username already taken')
        } else {
            user = new User({
                username: req.body.username,
                password: req.body.password
            });
            await user.save();
            res.redirect('/login');
        }
    } catch (err) {
        return res.status(400).send(err.message);
    }
};

// DEV ONLY
const getAllUsers = async (req, res) => {
    const users = await User.find({}, { username: 1, friends: 1 }).populate('friends', 'username')
    return res.json({
        status: "success",
        count: users.length,
        data: users,
    });
};

module.exports = {
    accountRegister,
    getAllUsers,
    LoginPage,
    RegisterPage,
}