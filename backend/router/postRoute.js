import e from "express";
import protectRoute from "../middleware/protectRoute.js";
import { commentOnPost, createPost, deletePost, getAllPost, getFollowingPosts, getLikedPosts, getUserPost, likeUnlikePost } from "../controller/postController.js";

const postRoute = e.Router()

postRoute.get('/all', protectRoute, getAllPost) //c
postRoute.get('/following', protectRoute, getFollowingPosts)
postRoute.get('/user/:username', protectRoute, getUserPost)
postRoute.post('/create', protectRoute, createPost) //c
postRoute.post('/:id', protectRoute, deletePost)
postRoute.post('/comment/:id', protectRoute, commentOnPost)
postRoute.post('/like/:id', protectRoute, likeUnlikePost)
postRoute.get('/likes', protectRoute, getLikedPosts)

export default postRoute