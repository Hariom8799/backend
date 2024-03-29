const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const dbConnect = require("./config/DBConnect")
dbConnect();

const user = require("./routes/user");
app.use("/api/v1",user);

app.listen(PORT, ()=>{
    console.log(`server started ${PORT}`);
})

app.get("/",(req,resp)=>{
    resp.send("hello everything went good")
})