const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = (req,resp,next)=>{
    try{
        const token = req.body.token;

        if(!token){
            return resp.status(401).json({
                success : false,
                message :"token is missing"
            })
        }

        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload)
            req.user = payload;
        } catch(error){
            return resp.status(403).json({
                success : false,
                message : "token is invalid"
            })
        }

        next();

    } catch(error){
        console.error(error)
        return resp.status(401).json({
            success :false,
            message :"something went wrong"
        })
    }
}

exports.isStudent =(req,resp,next)=>{
    try{

        if(req.user.role !== "Student"){
            return resp.status(401).json({
                success : false,
                message:"you are not allowed to this route it is student route"
            })
        }
        next()

    }   catch(error){
        console.error(error)
        return resp.status(500).json({
            success : false,
            message :"something went wrong"
        })
    }
    
}

exports.isAdmin =(req,resp,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return resp.status(401).json({
                success : false,
                message:"you are not allowed to this route it is student route"
            })
        }
        next()

    }   catch(error){
        console.error(error)
        return resp.status(500).json({
            success : false,
            message :"something went wrong"
        })
    }
}