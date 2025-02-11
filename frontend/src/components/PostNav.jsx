import usePostStore from "../store/postStore"

const PostNav = () => {
    const {setPostSelection, postSection, getLikedPosts,getAllPost, getFollowingPosts} = usePostStore()
    
    const handleLikedPosts = async ()=>{
        await getLikedPosts()
        await setPostSelection("liked")
        // await setPostvalues(likedPosts)
        // console.log(postsValues);
        
    }
    const handleForYouPosts = async ()=>{
        setPostSelection("forYou")
        // await setPostvalues(posts)
        await getAllPost()
    }
    const handleFollwingPosts = async ()=>{
        // setPostvalues(followingPosts)
        setPostSelection("follwingPosts")
        await getFollowingPosts()
    }
  return (
    <div className={`flex justify-around text-lg gap-1 mt-1 `} >
        <p onClick={handleForYouPosts} className={`btn btn-ghost flex-1 transition-all duration-500 ease-in-out ${postSection == 'forYou'? "bg-base-300" : ""}`} >For You</p>
        <p onClick={handleLikedPosts} className={`btn btn-ghost flex-1 transition-all duration-500 ease-in-out ${postSection == 'liked'? "bg-base-300" : ""}`} >Liked</p>
        <p onClick={handleFollwingPosts} className={`btn btn-ghost flex-1 transition-all duration-500 ease-in-out ${postSection == 'follwingPosts'? "bg-base-300" : ""}`} >Follwing</p>
    </div>
  )
}

export default PostNav