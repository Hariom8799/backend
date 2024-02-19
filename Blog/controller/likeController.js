const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req,resp)=>{

    try{
        const {post,user} = req.body;

        const likedPost = await Like.create({post,user});

        const updatedPost = await Post.findByIdAndUpdate(post, {like : likedPost._id} , {new:true}).populate("like").exec();

        resp.status(200).json({
            message :  "liked successfully",
            post : updatedPost
        })
    }
    catch(err){
        console.error(err);
        resp.status(500).json({
            success : false,
            message : "internal server error"
        })
    }    
}


exports.unLikePost = async (req,resp)=>{

    try{
        const {post,like} = req.body;

        const unLikedPost = await Like.findOneAndDelete({_id:like});

        const updatedPost = await Post.findByIdAndUpdate(post, {$pull : {like : unLikedPost._id }} , {new:true});

        resp.status(200).json({
            message :  "unliked successfully",
            post : updatedPost
        })
    }
    catch(err){
        console.error(err);
        resp.status(500).json({
            success : false,
            message : "internal server error"
        })
    }    
}