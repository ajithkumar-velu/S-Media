import generateToken from "../lib/generateToken.js";
import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary";

export const signin = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body


        if (!username || !fullname || !email || !password) {
            return res.status(400).json({ message: "please fill all fields" })
        }
        if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" })

        const findUsename = await User.findOne({ username })

        if (findUsename) {
            return res.status(400).json({ message: "Username already exists." })
        }

        const findEmail = await User.findOne({ email })

        if (findEmail) {
            return res.status(400).json({ message: "Email already taken." })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const user = new User({
            username,
            fullname,
            password: hashedpassword,
            email
        })

        if (user) {
            generateToken(user._id, res)
            await user.save()
            return res.status(201).json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                followers: user.followers,
                following: user.following,
                profileImg: user.profileImg,
                coverImg: user.coverImg,
                bio: user.bio,
                link: user.link,
            })
        } else {
            return res.status(400).json({ message: "Invalid user data" })
        }


    } catch (error) {
        console.log("Error in signin controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user) return res.status(400).json({ message: "Invalid credintials" })

        const decode = await bcrypt.compare(password, user.password)

        if (!decode) {
            return res.status(400).json({ message: "Invalid credintials" })
        }
        generateToken(user._id, res)

        return res.status(200).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
            bio: user.bio,
            link: user.link,
        })



    } catch (error) {
        console.log("Error in Login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout sucessfully" })
    } catch (error) {
        console.log("Error in Login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const getMe = async (req, res) => {
    try {
        // const user = req.user
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in Login controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error." })
    }
}

export const profile = async (req, res) =>{
    try {
        const userId = req.user._id
        console.log(userId);
        
        const { profileImg } = req.body;
        if(!profileImg) return res.status(400).json({message: "Please select an Image!"})

        const image = await cloudinary.uploader.upload(profileImg)

        const imageUrl = image.secure_url

        const updatedUser = await User.findByIdAndUpdate(userId, {profileImg: imageUrl}, {new: true})

        res.status(200).json(updatedUser)
        
    } catch (error) {
        console.log("Error in profile controller: ", error.message);
        res.status(500).json({message: "Internal Server Error."})
    }
}