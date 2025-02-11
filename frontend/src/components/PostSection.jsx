import { Heart, MessageSquareText } from "lucide-react"
import usePostStore from "../store/postStore"

import useAuthStore from "../store/authStore"
import { useEffect, useState } from "react"
import useUserStore from "../store/userStore"
import PostSectionSkeltion from "./skelton/PostSectionSkeltion"



const PostSection = () => {
    const { authUser, followUnfollowUser, getme, setProfileShow, getNotifications, notificationsData, setActiveNav } = useAuthStore()
    const { posts, likeUnlikePost, getAllPost, commentOnPost, likedPosts, getLikedPosts, postSection, getFollowingPosts, getUserPost, profilePosts, isGetAllPost } = usePostStore()
    const [comment, setComment] = useState("")
    const [isIdxValue, setIsIdxValue] = useState(null)
    // getNotifications()
    // console.log(notificationsData);
    
    const { getUser } = useUserStore()

    const handleGetUser = async (data) => {
        setActiveNav('profile')
        await getUser(data)
        setProfileShow(true)
        scrollToTop()
        await getUserPost(data)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    const handlePostLike = async (id) => {
        await likeUnlikePost(id)

        if (postSection == "forYou") {
            await getAllPost()

        } else if (postSection == "liked") {
            await getLikedPosts()
        } else {
            getFollowingPosts()
        }
    }

    const handlecommentSubmit = async (id) => {
        await commentOnPost(id, comment)
        setComment("")
        await getAllPost()
    }
    const handleCommentBoxCollapse = (idx) => {
        if (isIdxValue != idx) {
            setIsIdxValue(idx)
        } else {
            setIsIdxValue(null)
        }
    }

    const handleFollowUnfollow = async (id) => {
        await followUnfollowUser(id)
        await getme()
    }

    return (
        <div className="w-full overflow-y-auto h-full" >

            {/* <div className="w" > */}
            {isGetAllPost ?

                <PostSectionSkeltion /> :
                <div>
                    {posts && posts.map((post, idx) => (
                        <div key={idx} className="bg-base-200 rounded-b-lg mb-1 " >
                            {/* top */}
                            <div className="flex justify-between items-center gap-2 px-5 py-2" >
                                <div className="flex items-center gap-2" >

                                    <img onClick={() => handleGetUser(post.user.username)} className="size-11 rounded-full cursor-pointer" src={post.user.profileImg || "avatar-placeholder.png"} alt="" />
                                    <div>

                                        <p className="text-xl font-semibold" >{post.user.username}</p>
                                        <p className="text-sm" >{post.createdAt.toString().split('T')[0]}</p>
                                    </div>
                                </div>{ }
                                <p className={`btn rounded-full px-7 ${authUser.following.includes(post.user._id) ? "bg-zinc-800" : "bg-blue-700"}`} onClick={() => handleFollowUnfollow(post.user._id)} >{authUser.following.includes(post.user._id) ? "Following" : "Follow"}</p>
                            </div>


                            {/* body */}
                            <div>
                                <p className="text-lg ml-5 py-2" >{post.text}</p>
                                <img src={post.img} alt="" />

                            </div>

                            {/* bottom */}
                            <div className="flex items-center justify-evenly px-5 py-4" >
                                <div className="flex items-center gap-1 rounded btn btn-ghost " >

                                    <Heart onClick={() => handlePostLike(post._id)} className={`size-6 cursor-pointer ${post.likes.includes(authUser._id) && "fill-red-600 text-red-600"}`} />

                                    <p className="text-[15px]" >Like</p>
                                </div>
                                <button onClick={() => handleCommentBoxCollapse(idx)} className="flex items-center gap-1 rounded btn btn-ghost " >

                                    <MessageSquareText className="size-6 cursor-pointer  " />
                                    <p className="text-[15px]" >comment</p>
                                </button>
                            </div>

                            {/* Comment section */}
                            <div className={`px-5 transition-all duration-500 ease-in-out overflow-hidden ${idx === isIdxValue ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                                }`} >
                                {/* comment intput box */}

                                <div className="px-10 flex gap-2 items-center border-t py-4" >
                                    <img src={authUser.profileImg || "avatar-placeholder.png"} className="w-11 rounded-full h-11" alt="" />
                                    <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Comment here" className="input input-bordered w-full rounded-full" />
                                    <div onClick={() => handlecommentSubmit(post._id)} className="btn-sm text-xs btn rounded-full btn-ghost bg-blue-600" >
                                        Comment
                                    </div>

                                </div>
                                {/* all comments */}
                                <div className="bg-base-300 px-5  rounded-lg" >

                                    {post.comments.map((comment, idx) => (
                                        <div key={idx} className="first:pt-3 last:pb-7  pt-2 mb-3" >

                                            <div className=" flex items-center gap-2 py-1.5" >
                                                <img src={comment.user.profileImg || "avatar-placeholder.png"} className="w-8 rounded-full h-8" alt="" />
                                                <div>

                                                    <p className="text-[16px] font-semibold" >{comment.user.username}</p>
                                                    <p className="text-[14px]" >{comment.user.bio}</p>
                                                </div>

                                            </div>
                                            <p className="text-[18px] ml-10" >{comment.text}</p>
                                        </div>

                                    ))}
                                </div>
                            </div>


                        </div>
                    ))}

                </div>
            }
            {/* </div> */}
            {posts && posts.length == 0 && (<div className="text-center text-2xl mt-32" >Data not found</div>)}

        </div>
    )
}

export default PostSection