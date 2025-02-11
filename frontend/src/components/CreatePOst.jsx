import { useState } from "react"
import useAuthStore from "../store/authStore"
import { Image } from 'lucide-react'
import usePostStore from "../store/postStore"
import toast from "react-hot-toast"
import PostSection from "./PostSection"
import PostNav from "./PostNav"
import LikedPosts from "./LikedPosts"
import FollowingPosts from "./FollowingPosts"
import CreatePostSkelton from "./skelton/CreatePostSkelton"
const CreatePOst = () => {
    const { authUser } = useAuthStore()
    const { createPost, isPostCreate, getAllPost, postSection, isCreatePost } = usePostStore()
    const [img, setImage] = useState(null)
    const [text, setText] = useState("")

    const HandlePostCreate = async () => {
        if (!img && !text) {
            toast.error("Post must be either image or text")
            return
        } else if (text && !img) {
            createPost({ text: text })
        }
        else if (img && text) {
            await createPost({ img: img, text: text })
        } else {
            await createPost({ img: img })
        }
        getAllPost()
        setImage(null)
        setText("")
    }

    const handleImageChange = (e) => {
        const data = e.target.files[0]
        if (!data) return
        const reader = new FileReader()
        reader.readAsDataURL(data)

        reader.onload = () => {
            setImage(reader.result)
        }
    }
    return (
        <div className="flex flex-col w-full max-w-xl h-full" >
            {/* {isCreatePost?  */}
            {/* <CreatePostSkelton/> */}
            <div className="bg-base-200 px-5 py-4 rounded-lg" >
                {/* post text */}
                <div className="flex gap-2 items-center w-full" >

                    <img src={authUser.profileImg || "avatar-placeholder.png"} className="w-11 rounded-full h-11" alt="" />
                    <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Start a post" className="flex-1 input input-bordered w-full  rounded-full" />
                    {/* post image */}
                    <label className="btn btn-circle btn-ghost bg-zinc-800" >
                        <input onChange={handleImageChange} type="file" className="hidden" accept="image/*" />
                        <Image className="size-5" />
                    </label>
                </div>
                {/* post selected image */}
                {img &&
                    <div className=" relative flex pt-5 items-center justify-center mt-4" >
                        <p onClick={() => setImage(null)} className=" absolute top-0 right-0 text-2xl font-medium btn btn-circle btn-ghost bg-zinc-800 text-red-700" >X</p>
                        <img src={img} className="max-w-md" alt="" />
                    </div>}
                {/* post button */}
                <div>
                    <button onClick={HandlePostCreate} className="btn bg-blue-700 float-end px-10 rounded-full mt-3 flex items-center" >
                        {isPostCreate ?
                            <div className="flex items-center space-x-1">
                                Posting
                                <div className="ml-2 w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
                            </div> :
                            "Post"
                        }


                    </button>
                </div>
            </div>
            

            <PostNav />


            {postSection == "forYou" ? <PostSection /> : null}
            {postSection == "liked" ? <LikedPosts /> : null}
            {postSection == "follwingPosts" ? <FollowingPosts /> : null}


        </div>
    )
}

export default CreatePOst