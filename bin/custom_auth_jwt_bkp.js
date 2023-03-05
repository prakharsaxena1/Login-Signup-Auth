const crypto = require('crypto');
const fs = require('fs');

const publicKey = fs.readFileSync('bin\\id_rsa_pub.pem', 'utf-8');
const privateKey = fs.readFileSync('bin\\id_rsa_priv.pem', 'utf-8');

const encryptWithPublicKey = (publicKey, message) => crypto.publicEncrypt(publicKey, Buffer.from(message, 'utf-8'));
const decryptWithPublicKey = (privateKey, secret) => crypto.privateDecrypt(privateKey, Buffer.from(secret, 'ascii'));

const secret = encryptWithPublicKey(publicKey, 'Hello World');
console.log(secret.toString());

const message = decryptWithPublicKey(privateKey, secret);
console.log(message.toString());
