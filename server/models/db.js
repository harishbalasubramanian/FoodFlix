const mongoose = require('mongoose')
require('dotenv').config();
const uri = process.env.DATABASE_URI;
mongoose.connect(uri, {
    useNewUrlParser:true,
})
const database = mongoose.connection
database.on('error',console.error.bind())
database.once('open',() => {
    console.log('Connected to MongoDB');
})
module.exports = mongoose;