import { v2 as Cloudinary } from 'cloudinary'
import Post from '../models/postModel.js'
import Notification from '../models/notificationModel.js'
import User from '../models/userModel.js'

export const createPost = async (req, res) => {
    try {
        let { img } = req.body
        const { text } = req.body
        const userId = req.user._id

        if (!img && !text) return res.status(400).json({ message: "Post must have Image or Text." })

        if (img) {
            const uploadImage = await Cloudinary.uploader.upload(img)
            img = uploadImage.secure_url
        }

        const newPost = new Post({
            img,
            text,
            user: userId
        })
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
        console.log("Error in createPost controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findById(postId)
        if (!post) return res.status(400).json({ message: "Post not found" })

        if (post.user.toString() !== req.user._id.toString()) return res.status(400).json({ message: "You can't delete this post." })

        if (post.img) {
            await Cloudinary.uploader.destroy(post.img.split('/').pop().split('.')[0])
        }
        await Post.findByIdAndDelete(postId)

        res.status(200).json({ message: "Post deleted successfully" })

    } catch (error) {
        console.log("Error in createPost controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const commentOnPost = async (req, res) => {
    try {
        const userId = req.user._id
        const postId = req.params.id
        const { text } = req.body

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        if (!text) {
            return res.status(400).json({ message: " Text is required" })
        }

        const comments = { text, user: userId }
        post.comments.push(comments)

        await post.save()

        res.status(200).json(post)



    } catch (error) {
        console.log("Error in createPost controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id
        const postId = req.params.id

        const post = await Post.findById(postId)

        if (!post) return res.status(400).json({ message: "Post not Found" })

        const isCheck = post.likes.includes(userId)

        if (isCheck) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } })
            res.status(200).json({ message: "Post Unliked" })
        } else {
            post.likes.push(userId)
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } })

            await post.save()

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: 'like'
            })
            await notification.save()
            res.status(200).json({ message: "Post Liked" })
        }
    } catch (error) {
        console.log("Error in createPost controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}


export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate({ path: 'user', select: "-password" }).populate({
            path: 'comments.user',
            select: '-password'
        })

        if (posts.length === 0) return res.status(400).json([])
        return res.status(200).json(posts)

    } catch (error) {
        console.log("Error in getAllPost controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}


export const getLikedPosts = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)

        const likedPosts = await Post.find({_id: {$in: user.likedPosts}}).populate({ path: 'user', select: '-password'}).populate({path: "comments.user", select: "-password"})

        res.status(200).json(likedPosts)
    } catch (error) {
        console.log("Error in getLikedPosts controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const getFollowingPosts = async (req, res)=>{
    try {
        const userId = req.user._id

        const user = await User.findById(userId)
        
        const feedPosts = await Post.find({user: {$in: user.following}}).sort({ createdAt: -1}).populate({path: 'user', select: '-password'}).populate({ path: 'comments.user', select: '-password'})

        // if(!feedPosts) return res.status(200).json([])

        res.status(200).json(feedPosts)
    } catch (error) {
        console.log("Error in getFollowingPosts controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const getUserPost = async (req, res) =>{
    try {
        const { username } = req.params

        const user = await User.findOne({ username })
        const userPost = await Post.find({user: user._id}).sort({createdAt: -1}).populate({path: 'user', select: '-password'}).populate({path: 'comments.user', select: '-password'})

        res.status(200).json(userPost)
    } catch (error) {
        console.log("Error in getFollowingPosts controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}