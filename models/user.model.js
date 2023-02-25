const mongoose = require('mongoose');

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
        select: false,
    },
}, { timestamps: true });

function verifyPassword (password, user) {
    return user.password === password;
}

userSchema.methods.verifyPassword = verifyPassword;

const User = mongoose.model("User", userSchema);
module.exports = User;