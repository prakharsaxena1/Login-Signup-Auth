const User = require('../models/user.model');

// ACCOUNT MANAGEMENT
// LOGIN
const accountLogin = async (req, res) => {
    console.log('Login');
};

const accountRegister = async (req, res) => {
    console.log('Register');
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
    accountLogin,
    accountRegister,
    getAllUsers
}