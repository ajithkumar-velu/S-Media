import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useAuthStore = create((set) => ({
    authUser: null,
    isChecking: false,
    isSignin: false,
    isLogin: false,
    isprofileUpdate: false,
    isCoverImgUpdate: false,
    isOpenModal: false,
    isUserInfoUpdate: false,
    profileShow:false,
    activeNav: 'home', 
    notificationsData: null,
    isNotifications: false,
    setActiveNav: (val)=>set({activeNav: val}),


    followUnfollowUser: async(id)=>{
        try {
            const res = await axiosInstance.post(`/user/follow/${id}`)
            // set({authUser: res.data.user})
            // console.log(res.data.user);
            
            toast.success(res.data.message)
        } catch (error) {
            console.log("Error in followUnfollowUser:", error.message);
            toast.error(error.response.data.message)
        }
    },
    getme: async () => {
        // set({ isChecking: true })
        try {
            const res = await axiosInstance.get('/auth/me')
            // console.log(res.data);
            
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in check: ", error.message);
            set({authUser: null})
        } 
    },
    check: async () => {
        set({ isChecking: true })
        try {
            const res = await axiosInstance.get('/auth/me')
            // console.log(res.data);
            
            set({ authUser: res.data })
        } catch (error) {
            console.log("Error in check: ", error.message);
            set({authUser: null})
        } finally {
            set({ isChecking: false })
        }
    },
    login: async (data) => {
        set({ isLogin: true })
        try {
            
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            // console.log(res.data);
            toast.success("Login Successfully!")

        } catch (error) {
            console.log("Error in login: ", error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isLogin: false })
        }
    },

    signin: async (data) => {
        set({ isSignin: true })
        try {
            const res = await axiosInstance.post('/auth/signin', data)
            set({ authUser: res.data })
            // console.log(res.data);
            toast.success("Signin Successfully!")

        } catch (error) {
            console.log("Error in signin: ", error.message);
            toast.error(error.response.data.message)
        } finally {
            set({ isSignin: false })
        }
    },

    logout: async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            // console.log(res.data);
            toast.success("Logout Successfully!")

        } catch (error) {
            console.log("Error in logout: ", error.message);
            toast.error(error.response.data.message)
        }
    },

    profileUpdate: async (data) => {
        try {
            if (Object.keys(data)[0] == "profileImg"){

                set({isprofileUpdate: true})
            }
            else if (Object.keys(data)[0] == "coverImg"){

                set({isCoverImgUpdate: true})
            }else{
                set({isUserInfoUpdate: true})

            }
            
            const  res = await axiosInstance.post('/user/update', data)
            set({authUser: res.data})
            // console.log(res.data);
            if(res.data){
                set({isOpenModal:false})
            }else{
                set({isOpenModal:true})
            }
            toast.success("Profile update Successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.message);
        } finally {
            set({isprofileUpdate : false})
            set({isCoverImgUpdate : false})
            set({isUserInfoUpdate : false})
        }
    },
    setIsOpenModal: (val) => set({isOpenModal: val}),
    setProfileShow: (val) => set({profileShow: val}),

    // Notification
    getNotifications: async ()=>{
        set({isNotifications: true})
        try {
            const res = await axiosInstance.get('/notifications')
            set({notificationsData: res.data})
        } catch (error) {
            console.log("Error in getNotifications: ", error.message);
            toast.error(error.response.data.message)
        }
        finally{
            set({isNotifications: false})
        }
    },

    deleteNotification: async (id)=>{
        try {
            const res = await axiosInstance.delete(`/notifications/${id}`)
            toast.success("Notification Deleted Successfully!")
        } catch (error) {
            console.log("Error in deleteNotification: ", error.message);
            toast.error(error.response.data.message)
        }
    },
    deleteNotifications: async ()=>{
        try {
            const res = await axiosInstance.delete(`/notifications`)
            toast.success("All Notifications Deleted Successfully!")
        } catch (error) {
            console.log("Error in deleteNotifications: ", error.message);
            toast.error(error.response.data.message)
        }
    },

}))

export default useAuthStore