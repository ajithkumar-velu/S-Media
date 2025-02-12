import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const usePostStore = create((set, get) => ({
    posts: null,
    isPostCreate: false,
    postSection: "forYou",
    likedPosts: null,
    postsValues: null,
    followingPosts: [],
    profilePosts: null,
    isCreatePost: true,
    isGetAllPost: false,
    
    createPost: async (data) => {
        set({ isPostCreate: true })
        set({ isCreatePost: true })
        try {
            const res = await axiosInstance.post('/posts/create', data)
            toast.success("Post created successfully")
            console.log(res.data)
        } catch (error) {
            console.log("Error in createPost: ", error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isPostCreate: false })
            set({ isCreatePost: false })
        }
    },

    likeUnlikePost: async (id) => {
        try {
            
            const res = await axiosInstance.post(`/posts/like/${id}`)
            toast.success(res.data.message)

        } catch (error) {
            console.log("Error in likeUnlikePost:", error.message);
            toast.error(error.response.data.message)
        }
    },
    commentOnPost: async (id, data) => {
        try {
            const res = await axiosInstance.post(`/posts/comment/${id}`, { text: data })
        } catch (error) {
            console.log("Error in commentOnPost:", error.message);
            toast.error(error.response.data.message)
        }
    },
    getAllPost: async () => {
        set({isGetAllPost:true})
        try {
            const res = await axiosInstance.get('/posts/all')
            set({ posts: res.data })
        } catch (error) {
            console.log("Error in getAllposts: ", error.message);
            toast.error(error.response.data.message)
        }finally{
            set({isGetAllPost:false})
        }
    },
    getLikedPosts: async ()=>{
        set({isGetAllPost: true})
        try {
            
            const res = await axiosInstance.get('/posts/likes')
            // set({likedPosts: res.data})
            set({posts: res.data})

            // console.log(res.data);
        } catch (error) {
            console.log("Error in getLikedPosts:", error.message);
            toast.error(error.response.data.message)
        }finally{
            set({isGetAllPost: false})
        }
    },
    getFollowingPosts:  async ()=>{
        set({isGetAllPost: true})
        try {
            const res = await axiosInstance.get('/posts/following')
            console.log(res.data);
            set({posts: res.data})
        } catch (error) {
            console.log("Error in getFollwingPosts:", error.message);
            toast.error(error.response.data.message)
        }finally{
            set({isGetAllPost: false})
        }
    },
    getUserPost: async (data) =>{
        try {
            const res = await axiosInstance.get(`/posts/user/${data}`)
            set({profilePosts: res.data})
        } catch (error) {
            console.log("Error in getUserPost:", error.message);
            toast.error(error.response.data.message)
        }
    },
    deletePost: async (data) =>{
        try {
            const res = await axiosInstance.post(`/posts/${data}`)
            // set({profilePosts: res.data})
            toast.success('Post deleted successfully')
        } catch (error) {
            console.log("Error in deletePost:", error.message);
            toast.error(error.response.data.message)
        }
    },
    
    setPostSelection: (val) => set({postSection: val}),
    setPostvalues: (val) => set({postsValues: val}),
    
}))

export default usePostStore