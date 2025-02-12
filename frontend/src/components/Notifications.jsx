import { ArrowLeft, Delete, Trash, X } from "lucide-react"
import { formatDateTime } from "../lib/timeDateConvert"
import useAuthStore from "../store/authStore"
import useUserStore from "../store/userStore"
import usePostStore from "../store/postStore"

const Notifications = () => {
    const { notificationsData, setProfileShow, setActiveNav, deleteNotification, getNotifications, deleteNotifications } = useAuthStore()
    const { getUser } = useUserStore()
    const { getUserPost } = usePostStore()

    const handleProfileInfo = async (data) => {
        await getUser(data)
        setProfileShow(true)
        // await setProfileInfo(authUser)
        setActiveNav('profile')

        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds a smooth scrolling animation
        });
        await getUserPost(data)
        // await getUserPost(authUser.username)

    }
    const handleDeleteNotification = async (id)=>{
        await deleteNotification(id)
        await getNotifications()
    }

    const handleDeleteAllNotifications = async ()=>{
        await deleteNotifications()
        await getNotifications()
    }
    return (
        <div className="w-full max-w-xl rounded-lg pb-5 bg-base-200 h-fit mb-1 overflow-auto" >

            <div className="bg-base-300 flex justify-between items-center px-3" >
                <div className="flex gap-2 items-center" >
                    <div onClick={()=>setActiveNav('home')} className="btn btn-circle btn-ghost" >
                        <ArrowLeft />
                    </div>
                    <p className="text-[28px] font-bold py-4" >Notifications</p>
                </div>
                <div onClick={()=>handleDeleteAllNotifications()} className="btn btn-circle btn-ghost" >
                    <Trash className="w-6 h-6" />
                </div>
            </div>
            {notificationsData && notificationsData.map((notify, idx) => (

                <div key={idx} className="flex justify-between items-center py-3 px-5" >
                    <div onClick={() => handleProfileInfo(notify.from.username)} className="flex gap-3 items-center" >
                        <img src={notify.from.profileImg || "./avatar-placeholder.png"} className="size-11 rounded-full cursor-pointer" alt="" />
                        <div >
                            <p className="text-[18px]  font-semibold mb-2" >{notify.from.username}</p>
                            <p className="text-[14px] text-zinc-400" >{notify.type === 'like' ? 'Liked ❤️ your Post' : 'Followed you'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3" >
                        <p className="text-[14px] text-zinc-400" >{formatDateTime(notify.createdAt)}</p>
                        <p onClick={()=>handleDeleteNotification(notify._id)} className="btn btn-sm btn-ghost btn-circle text-[20px] items-center justify-center text-red-600" ><p className="" >X</p></p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notifications