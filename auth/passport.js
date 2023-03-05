const path = require('path');
const fs = require('fs');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user.model');
const { createKeysIfNotExist } = require('./auth');

createKeysIfNotExist();
const PUB_KEY = fs.readFileSync(path.join('bin', 'id_rsa_pub.pem'), 'utf8');

const cookieExtractor = (req) => {
    try {
        const token = req?.cookies['authorization']?.split(' ')[1];
        return token || null;
    } catch (err) {
        return null;
    }
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

const verifyCallback = async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.sub });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (err) {
        return done(err, false);
    }
}

const strategy = new JwtStrategy(options, verifyCallback);

module.exports = (passport) => {
    passport.use(strategy);
}
