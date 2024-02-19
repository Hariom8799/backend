const express = require("express")

const router = express.Router();

const {createPost,getPosts} = require("../controller/postController");
const {createComment} = require("../controller/commentController");
const {likePost,unLikePost} = require("../controller/likeController")

router.post("/comment/create" , createComment);
router.post("/posts/create",createPost);
router.get("/posts",getPosts);
router.post("/likes/like",likePost);
router.delete("/likes/unlike",unLikePost);




module.exports = router

