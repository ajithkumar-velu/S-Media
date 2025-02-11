import { Bell, Home, LogOut, User } from 'lucide-react'
import useAuthStore from "../store/authStore"
import useUserStore from "../store/userStore"
import usePostStore from "../store/postStore"
import { useState } from 'react'

const LeftNav = () => {
    const { logout } = useAuthStore()
    const {setProfileInfo} = useUserStore()
    // const [activeNav, setActiveNav] = useState("home")
    const  {authUser, setProfileShow, profileShow, activeNav, setActiveNav, getNotifications}  = useAuthStore()
    const { getUserPost} = usePostStore()

    const logoutHandler = () => {
        logout()
    }
    const handleProfileInfo = async ()=>{
        await setProfileInfo(authUser)
        setProfileShow(true)
        setActiveNav('profile')
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds a smooth scrolling animation
        });        
        await getUserPost(authUser.username)

    }
    const handleHome = ()=>{
        setProfileShow(!profileShow)
        setActiveNav('home')
    }
    const handleNotification = ()=>{
        setProfileShow(!profileShow)
        getNotifications()
        setActiveNav('notification')
    }

    return (
        <div className='bg-base-200 hidden rounded-lg  py-3 h-fit w-full max-w-xs xl:flex flex-col gap-3' >
            <h2 className='font-extrabold text-blue-600 cursor-pointer ml-5' >S-Media</h2>
            <div className='flex px-5 flex-col py-2 gap-3' >
                
                <div className={`py-2 ${activeNav==="home" && "bg-base-300"}`} >
                    <Home onClick={handleHome} className='size-7 cursor-pointer  w-full text-left' />
                </div>
                <div className={`py-2 ${activeNav==='profile'&&"bg-base-300"}`} >
                    <User onClick={handleProfileInfo} className='size-7 cursor-pointer  w-full text-left' />
                </div>
                <div className={`py-2 ${activeNav==="notification" && "bg-base-300"}`} >
                    <Bell onClick={handleNotification} className='size-7 cursor-pointer  w-full text-left' />
                </div>
                <div className='py-2 ' >

                    <LogOut onClick={logoutHandler} className='size-7 cursor-pointer w-full text-left' />
                </div>
            </div>
        </div>
    )
}

export default LeftNav