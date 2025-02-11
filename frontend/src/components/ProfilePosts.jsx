import React from 'react'
import usePostStore from '../store/postStore'
import { Trash } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useUserStore from '../store/userStore'

const ProfilePosts = () => {
    const { profilePosts, deletePost, getUserPost } = usePostStore()
    const { authUser} = useAuthStore()
    const {profileInfo} = useUserStore()

    const handlePostDelete = async (id)=>{
        await deletePost(id)
        await getUserPost(profileInfo.username)
    }

    return profilePosts && (
        <div className='w-fll max-w-xl' >
            {
                profilePosts.map((post, idx) => (
                    <div key={idx} className=' mb-2 bg-base-300 px-6 py-2 rounded-lg' >
                        <div className='my-2 flex justify-between items-center' >
                            {/* dferf */}
                            <p className='text-[20px]' >{post.text}</p>
                            {authUser._id === profileInfo._id &&
                            <button onClick={()=>handlePostDelete(post._id)} className='btn btn-ghost btn-circle hover:text-red-600 hover:scale-110 transition-all duration-300 ease-in-out' ><Trash/></button>}
                        </div>
                        <img src={post.img} alt="" />
                    </div>
                ))
            }
        </div>

    )
}

export default ProfilePosts