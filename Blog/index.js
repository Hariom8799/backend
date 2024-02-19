const express = require("express");

const app = express();

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 4000

const DBConnect = require("./config/DBConnect")
DBConnect();

const path = require("./routes/Blog")
app.use("/api/v1" ,path);


app.listen(PORT , ()=>{
    console.log(`server listen at ${PORT}`)
})

app.get("/",(req,resp)=>{
    resp.send("<h1>this is a homepage</h1>")
})


