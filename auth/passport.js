const path = require('path');
const fs = require('fs');
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user.model');

const PUB_KEY = fs.readFileSync(path.join('bin', 'id_rsa_pub.pem'), 'utf8');

const cookieExtractor = function (req) {
    try {
        let token = null;
        if (req && req.cookies) token = req.cookies['authorization'];
        token = token.split(' ');
        if (token.length !== 2) {
            return null;
        }
        return token[1];
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
