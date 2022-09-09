const mongoose = require('mongoose');
require('dotenv').config();
const dbString = process.env.DATABASE_KEY;

function connectDB() {
    return mongoose
    .connect(dbString)
    .then(() => console.log('connect MongoDB'))
    .catch(err  => console.log(err))
}

module.exports = connectDB