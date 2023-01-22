// Loads the test.env file
require('dotenv').config({ path: __dirname + '/dev.env' })

const app = require('../app');
// Sets the port for the server to run at
const PORT = process.env.PORT || 8000;

// LISTENING TO PORT 
app.listen(PORT, () => {
    console.log(`listening to port : http://localhost:${PORT}/`)
})

module.exports = app