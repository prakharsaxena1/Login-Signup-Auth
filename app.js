const express = require("express");
require("./db/connection");
const app = express();
require('./auth/auth');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes'));

// Invalid request handler
app.use('*', (req, res) => {
    res.json({
        message: `INVALID REQUEST AT: ${req.originalUrl}`
    });
});

module.exports = app;