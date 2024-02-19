const express = require('express');
const app = express();

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const todoRoutes = require("./routes/todos");
app.use("/api/v1",todoRoutes);

app.listen(PORT, ()=>{
    console.log(`server started successfully ${PORT}`);
})


const dBConnect = require("./config/Database")

dBConnect();


app.get("/", (req,resp)=>{
    resp.send("hello")
})
