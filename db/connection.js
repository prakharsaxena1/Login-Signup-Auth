const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose.set('strictQuery', false); // to remove the deprication warning
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connection success."))
    .catch((error) => console.log(error));

module.exports = mongoose.connection;