const Post = require("../models/postModel");

exports.createPost = async (req,resp)=>{
    try{

        const {title,body} = req.body;

        const response = await Post.create({title,body});

        resp.status(200).json({
            message : "success",
            post : response
        })

    }
    catch(err){
        resp.status(500).json({
            message: "internal server error 1"
        })
    }
}

exports.getPosts = async (req,resp)=>{

    try{

        const data = await Post.find().populate("comment").exec();

        resp.status(200).json({
            message : "success",
            post : data
        })

    }
    catch(err){
        resp.status(500).json({
            message: "internal server error"
        })
    }
    
}