const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

//asynchronous pointter function
const connectDB = async () =>{
    try{
    await mongoose.connect(db, { useNewUrlParser: true });

    console.log("Mongo db connected successfully");

    }
    catch(err)
    {
        console.error(err.message);
        //exits with failure
        process.exit(1);
    }
}

module.exports = connectDB;