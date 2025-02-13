import useAuthStore from '../store/authStore'
import Images from '../assets/Assets';
import { ArrowLeft, Camera, Pencil } from 'lucide-react';
import { useState } from 'react';
import useUserStore from '../store/userStore';
import usePostStore from '../store/postStore';



const Profile = () => {

    const { authUser, profileShow, setProfileShow, profileUpdate, isprofileUpdate, isCoverImgUpdate, setIsOpenModal, followUnfollowUser, getme, setActiveNav } = useAuthStore()
    const [profileImage, setProfileImage] = useState(null)


    const { profileInfo, getUser, getSuggestedUsers } = useUserStore()
    const { profilePosts, getAllPost } = usePostStore()
    // console.log(profileInfo);
    

    // const [coverImage, setCoverImage] = useState(null)
    // const [profileShow, setProfileShow] = useState(true)
    const handleProfileChange = async (e, key) => {
        const profile = e.target.files[0]
        if (!profile) return

        const reader = new FileReader()
        reader.readAsDataURL(profile)

        reader.onload = async () => {

            if (key == 'profileImg') {

                setProfileImage(reader.result)
                await profileUpdate({ profileImg: reader.result })
                await getAllPost()
            } else {
                    // setCoverImage(reader.result)
                await profileUpdate({ coverImg: reader.result })
            }
        }
    }

    const handleFollowUnfollow = async () => {
        // console.log("check");
        
        await followUnfollowUser(profileInfo._id)
        // console.log(authUser);

        await getme()
        getUser(profileInfo.username)
        getSuggestedUsers()
        // console.log(authUser);
    }


// console.log(profileInfo);


    return profilePosts && (
        // <div className='w-[250px] rounded-lg overflow-hidden pb-5 bg-base-200 h-fit'>
        profileShow &&
        <div className='w-full max-w-xl rounded-lg pb-5 bg-base-200 h-fit mb-1' >

            <div className={` relative `} >
                <button className='btn btn-ghost btn-circle absolute right-4 font-bold hover:text-xl bg-zinc-600' onClick={()=>setActiveNav('home')} ><ArrowLeft className='size-5'/></button>
                {isCoverImgUpdate ?

                    <div className='m-auto h-40 flex items-center justify-center skeleton' >
                        <p className='loading'></p>
                    </div> :
                    // cover image
                    <img src={profileInfo.coverImg || "cover.png"} className='h-48 w-full object-cover' alt="" />

                }
                {authUser._id === profileInfo._id &&
                <label className=' absolute bottom-2 right-1' >
                    <input onChange={(e) => handleProfileChange(e, "coverImg")} type="file" accept='image/*' className='hidden' />
                    <span className='btn btn-sm btn-circle  bg-gray-500 hover:bg-gray-900' >
                        <Camera className='size-5' />
                    </span>
                </label>}
                {/* profile image */}
                <div className='absolute -bottom-16 left-12 '>
                    <div className=' relative' >
                        {isprofileUpdate ?
                            <div className='w-32 h-32 rounded-full border-4 p-0.5 border-green-600 flex items-center justify-center skeleton' >
                                <p className='loading'></p>
                            </div> :
                            <img className='w-32 h-32 rounded-full border-4 p-0.5 border-green-600' src={profileImage || profileInfo.profileImg || Images.userAvatar} alt="" />
                        }
                        {authUser._id === profileInfo._id &&
                        <label className=' absolute bottom-2 -right-1  ' >
                            <input onChange={(e) => handleProfileChange(e, "profileImg")} type="file" accept='image/*' className='hidden' />
                            <span className='btn btn-sm btn-circle cursor-pointer bg-gray-700 hover:bg-gray-900' >
                                <Camera className='size-5' />
                            </span>
                        </label>}
                    </div>
                </div>

            </div>


            <div className='mt-20 pl-6 relative' >
            {authUser._id === profileInfo._id &&
                <label onClick={() => setIsOpenModal(true)} className=' absolute -top-3 right-1' >
                    <span className='btn btn-sm btn-circle  bg-gray-500 hover:bg-gray-900' >
                        <Pencil className='size-4' />
                    </span>
                </label>}
                {authUser._id !== profileInfo._id &&
                <p onClick={()=>handleFollowUnfollow()} className={`btn rounded-full px-7 absolute top-16 right-6 ${authUser.following.includes(profileInfo._id) ? "bg-zinc-800" : "bg-blue-700"}`}  >{authUser.following.includes(profileInfo._id) ? "Following" : "Follow"}</p>}
                <div className='flex flex-col gap-2' >
                    {/* <Modelbox/> */}
                    <p className='text-2xl text-white font-semibold' >{profileInfo.username}</p>
                    <p className='text-[17px]' >{profileInfo.fullname}</p>
                    <p className='text-[17px]' >{profileInfo.email}</p>
                    <p className='text-[17px]' >{profileInfo.link}</p>
                    <p className='text-[17px]' >{profileInfo.bio}</p>
                </div>
            </div>

            {/* Follow unFollow */}
            <div className='grid grid-cols-3 gap-2 mx-5 mt-8 pb-5' >
                <div className='flex flex-col items-center justify-center gap-2' >
                    <p className='text-[20px]' >{profilePosts.length}</p>
                    <p className='text-[20px] font-semibold   rounded-full ' >Posts</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2' >
                    <p className='text-[20px]' >{profileInfo.following.length}</p>
                    <p className='text-[20px] font-semibold   rounded-full ' >Following</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2' >
                    <p className='text-[20px]' >{profileInfo.followers.length}</p>
                    <p className='text-[20px] font-semibold  rounded-full ' >Followers</p>
                </div>
                
            </div>
        </div>
    )
}

export default Profile
