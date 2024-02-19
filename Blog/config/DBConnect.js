const mongoose = require("mongoose")

require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("Db Connected successfully")
    })
    .catch((err)=>{
        console.error(err)
        console.log("Db not connect")
        process.exit(1)
        
    })
}

module.exports = dbConnect;