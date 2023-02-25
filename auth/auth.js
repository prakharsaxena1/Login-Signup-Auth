const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

const verifyCallback = async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user || !user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user)
        })
        .catch((err) => done(err));
});
