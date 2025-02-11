import usePostStore from "../store/postStore"
import PostSection from "./PostSection";


const LikedPosts = () => {
    const { likedPosts } = usePostStore()
    // console.log(likedPosts);
    
  return (
    <PostSection />
  )
}

export default LikedPosts