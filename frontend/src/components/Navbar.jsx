import { Bell, LogOutIcon, User } from "lucide-react"
import useAuthStore from "../store/authStore"
import useUserStore from "../store/userStore"
import usePostStore from "../store/postStore"

const Navbar = () => {
    const { logout } = useAuthStore()
    const { setProfileInfo } = useUserStore()
    const { authUser, setProfileShow, setActiveNav, getNotifications } = useAuthStore()
    const { getUserPost } = usePostStore()

    const logoutHandler = () => {
        logout()
    }

    const handleProfileInfo = async () => {
        await setProfileInfo(authUser)
        setProfileShow(true)
        setActiveNav('profile')

        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds a smooth scrolling animation
        });
        await getUserPost(authUser.username)

    }
    const handleNoftiy = async () => {
        await setActiveNav('notification')
        await getNotifications()
    }
    return (
        <div className="xl:hidden fixed top-0 w-full z-[1]" >
            <div className="navbar bg-base-300">
                <div className="navbar-start">

                    <h2 className='font-extrabold text-blue-600 cursor-pointer text-2xl' >S-Media</h2>
                </div>

                <div className="navbar-end gap-2">
                    <div onClick={() => handleProfileInfo()} className="btn btn-ghost btn-circle" >
                        <User className="size-5" />
                    </div>
                    <div onClick={handleNoftiy} className="btn btn-ghost btn-circle" >
                        <Bell className="size-5" />
                    </div>
                    <div onClick={logoutHandler} className="btn btn-circle btn-ghost" >
                        <LogOutIcon className="size-5 " />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar