import bcrypt from 'bcrypt'
import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary'
import Notification from '../models/notificationModel.js';


export const getUser = async (req, res) => {
    try {
        const { username } = req.params;

        const user = await User.findOne({ username }).select("-password")

        if (!user) return res.status(404).json({ message: "User not found" })

        res.status(200).json(user)

    } catch (error) {
        console.log("Error in getUser controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params
        const correntUser = await User.findById(req.user.id)
        const userToFollow = await User.findById(id)


        if (id === String(req.user._id)) return res.status(400).json({ message: "you con't follow yourself" })

        if (!correntUser || !userToFollow) return res.status(404).json({ message: "User not found" })

        const isFollowing = correntUser.following.includes(id)

        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: "Unfollowed Successfully", user: req.user })
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

            // send notification to the user

            const newNotification = new Notification({
                type: 'follow',
                from: req.user._id,
                to: userToFollow._id
            })
            await newNotification.save()
            res.status(200).json({ message: "Followed successfully", user: req.user })
        }
    } catch (error) {
        console.log("Error in followUnfollowUser controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id

        const followedByMe = await User.findById(userId).select("following")

        const users = await User.aggregate([
            { $match: { _id: { $ne: userId } } },
            { $sample: { size: 10 } }
        ])

        const filteredUser = users.filter(user => !followedByMe.following.includes(user._id))

        const suggestedUser = filteredUser.slice(0, 4)
        res.status(200).json(suggestedUser)

    } catch (error) {
        console.log("Error in followUnfollowUser controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateUser = async (req, res) => {
    const { username, fullname, email, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body

    const userId = req.user._id
// console.log("check");

    try {
        let user = await User.findById(userId)
        

        if (!user) return res.status(404).json({ message: "User not found" })

        if (!newPassword && currentPassword || newPassword && !currentPassword) res.json({ message: "Please provide both current and new password." })


        if (currentPassword && newPassword) {


            const isCheck = await bcrypt.compare(currentPassword, user.password)

            if (!isCheck) return res.status(400).json({ message: "Wrong Password" })

            if (newPassword.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(newPassword, salt)
        }


        if (profileImg) {
            if(user.profileImg){
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split(".")[0])
            }
            const upload = await cloudinary.uploader.upload(profileImg)
            profileImg = upload.secure_url
        }

        if (coverImg) {
            if(user.coverImg){
                await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split('.')[0])
            }
            const upload = await cloudinary.uploader.upload(coverImg)
            coverImg = upload.secure_url
        }

        user.fullname = fullname || user.fullname
        user.email = email || user.email
        user.username = username || user.username
        user.bio = bio || user.bio
        user.link = link || user.link
        user.profileImg = profileImg || user.profileImg
        user.coverImg = coverImg || user.coverImg

        user = await user.save()

        user.password = null

        res.status(201).json(user)




    } catch (error) {
        console.log("Error in updateUser: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}  