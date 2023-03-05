const express = require("express");
const cookieParser = require('cookie-parser');
const passport = require("passport");
require("./db/connection");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
require('./auth/passport')(passport);
app.use(passport.initialize());

// Routes
app.use(require('./routes'));

// Invalid request handler
app.use('*', (req, res) => {
    res.json({
        message: `INVALID REQUEST AT: ${req.originalUrl}`
    });
});

module.exports = app;