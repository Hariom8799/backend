const express = require("express");
const router = express.Router();


const {login,signup} = require("../controller/Auth");
const {auth,isStudent,isAdmin} = require("../middlewares/auth");

router.post("/login" , login);
router.post("/signup" , signup);

router.get("/test", auth , (req,resp)=>{
    resp.json({
        success : true,
        message : "autherize"
    })
})

router.get("/student" , auth , isStudent , (req,resp)=>{
    resp.json({
        success : true,
        message : "autherize successful you are student"
    })
})

router.get("/admin" , auth , isAdmin, (req,resp)=>{
    resp.json({
        success : true,
        message : "you are autherized you are admin "
    })
})

module.exports = router;