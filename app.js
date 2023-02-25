const express = require("express");
const connection = require("./db/connection");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const app = express();
require('./auth/auth');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = MongoStore.create({
    client: connection.getClient(),
    dbName: process.env.MONGO_DB_NAME,
    collectionName: "sessions",
});

app.use(
    session({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // equals 1 day
    })
);

// Routes
app.use(require('./routes'));

// Invalid request handler
app.use('*', (req, res) => {
    res.json({
        message: `INVALID REQUEST AT: ${req.originalUrl}`
    });
});

module.exports = app;