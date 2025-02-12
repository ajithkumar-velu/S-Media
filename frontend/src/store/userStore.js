import toast from "react-hot-toast";
import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useUserStore = create((set)=>({
    user: null,
    profileInfo:null,
    suggestedUser:null,
    isGetSuggestedUsers:false,
    getUser: async (data)=>{
        try {
            const res = await axiosInstance.post(`/user/profile/${data}`)
            set({profileInfo: res.data})
        } catch (error) {
            console.log("Error in getUser: ", error.message);
            toast.error(error.response.data.message)
        }
    },
    getSuggestedUsers: async ()=>{
        set({isGetSuggestedUsers: true})
        try {
            const res = await axiosInstance.post(`/user/suggested/`)
            set({suggestedUser: res.data})
            console.log(res.data);
            
        } catch (error) {
            console.log("Error in getSuggestedUsers: ", error.message);
            toast.error(error.response.data.message)
        }finally{
            set({isGetSuggestedUsers: false})
        }
    },
    setProfileInfo: (val) => set({profileInfo: val}),
    // followUnfollowUser: async(id)=>{
    //     try {
    //         const res = await axiosInstance.post(`/user/follow/${id}`)

            
    //         toast.success(res.data.message)
    //     } catch (error) {
    //         console.log("Error in followUnfollowUser:", error.message);
    //         toast.error(error.response.data.message)
    //     }
    // }
}))

export default useUserStore