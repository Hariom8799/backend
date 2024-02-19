const Comment = require("../models/commentModel");
const Post = require("../models/postModel");

exports.createComment = async (req,resp)=>{
    try {
        const {post,body, user} = req.body;
        const response = await Comment.create({post,body,user})

        const updatedPost = await Post.findByIdAndUpdate(post , {comment : response._id} , {new : true})
                                    .populate("comment")
                                    .exec();

        resp.status(200).json({
            commentData : response,
            postData : updatedPost,
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


