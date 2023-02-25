const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
        // select: false,
    },
}, { timestamps: true });

function verifyPassword(password) {
    return this.password === password;
}

userSchema.methods.verifyPassword = verifyPassword;

const User = mongoose.model("User", userSchema);
module.exports = User;