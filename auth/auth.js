const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const genKeyPair = require('./../bin/generateKeys');

const createKeysIfNotExist = () => {
    const privKeyPath = path.join('bin', 'id_rsa_priv.pem')
    const pubKeyPath = path.join('bin', 'id_rsa_pub.pem')
    if (!(fs.existsSync(privKeyPath) || fs.existsSync(pubKeyPath))) {
        genKeyPair();
    }
};

const issueJWT = (user) => {
    const PRIV_KEY = fs.readFileSync(path.join('bin', 'id_rsa_priv.pem'), 'utf8');
    const expiresIn = '1d';
    const payload = { sub: user._id, iat: Date.now() };
    const token = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return { token, expiresIn }
};

const setAuthCookie = (res, user) => {
    createKeysIfNotExist();
    const token = issueJWT(user);
    res.cookie('authorization', 'Bearer ' + token.token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        secure: true,
        httpOnly: true,
    });
    return res;
};

const cookieExtractor = (req) => {
    try {
        const token = req?.cookies['authorization']?.split(' ')[1];
        return token || null;
    } catch (err) {
        return null;
    }
};

const isAuthenticated = (req, res, next) => {
    const PUB_KEY = fs.readFileSync(path.join('bin', 'id_rsa_pub.pem'), 'utf8');
    const token = cookieExtractor(req);
    try {
        const decoded = jsonwebtoken.verify(token, PUB_KEY, { algorithms: ['RS256'] });
        if (!decoded) {
            return res.status(401).json({ code: 401, message: 'unauthorised' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ code: 401, message: 'unauthorised' });
    }
};

module.exports = {
    setAuthCookie,
    createKeysIfNotExist,
    isAuthenticated,
}