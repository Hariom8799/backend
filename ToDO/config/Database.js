
const mongoose = require("mongoose");

require("dotenv").config();

const DBConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB connected ")
    })
    .catch((err)=>{
        console.log("some error ")
        process.exit(1);
    })
}

module.exports = DBConnect;


