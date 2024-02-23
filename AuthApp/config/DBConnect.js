const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("DB connect successfully")})
    .catch((err)=>{
        console.error(err);
        console.log("DB not connected");
        process.exit(1);
    })
}

module.exports = dbConnect;