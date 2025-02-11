import useAuthStore from "../store/authStore"
import usePostStore from "../store/postStore"
import useUserStore from "../store/userStore"


const SuggestedUser = () => {
    const { suggestedUser, getSuggestedUsers, setProfileInfo, getUser } = useUserStore()
    const { followUnfollowUser, setProfileShow, authUser, setActiveNav } = useAuthStore()
    const { getUserPost } = usePostStore()

    const handleFollowUnfollow = async (id) => {
        await followUnfollowUser(id)
        // console.log(authUser);

        await getSuggestedUsers()
        // console.log(authUser);
    }

    const handleProfileInfo = async (data)=>{
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
    

    return suggestedUser && (
        <div className='bg-base-200 hidden md:block rounded-lg px-5 py-3 h-fit w-full max-w-xs' >
            <h2 className='text-2xl font-bold mb-2' >Who to follow</h2>

            {suggestedUser.map((user, idx) => (

                <div key={idx} className='flex justify-between items-center gap-8 mb-2' >
                    <div onClick={()=>handleProfileInfo(user.username)} className='flex items-center gap-2 cursor-pointer' >

                        <div className='w-10 h-10 rounded-full overflow-hidden' >

                            <img src={user.profileImg || `avatar-placeholder.png`} />
                        </div>
                        <div className='text-[18px]' >
                            <p className='font-semibold' >{user.fullname}</p>
                            <p className='text-[16px] text-zinc-400' >{user.username}</p>
                        </div>
                    </div>
                    <button onClick={()=>handleFollowUnfollow(user._id)} className='text-[15px] btn-sm bg-blue-600 px-7 rounded-full' >follow</button>
                </div>
            ))}
            {suggestedUser.length===0 && <p className="text-center text-[16px] my-5" >No data found</p>}

        </div>
    )
}

export default SuggestedUser