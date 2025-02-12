import useAuthStore from "../store/authStore"


const FollowingFollowers = () => {
    const {authUser} = useAuthStore()
    console.log(authUser.following);
    
  return (
    <div>
        {
            authUser.following.map((item, idx)=>(
                <div key={idx} >
                    <h2>{item}</h2>
                </div>
            ))
        }
    </div>
  )
}

export default FollowingFollowers