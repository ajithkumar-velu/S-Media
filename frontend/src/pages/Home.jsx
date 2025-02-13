import Modelbox from "../components/modelbox"
import Profile from "../components/Profile"
import CreatePOst from "../components/CreatePOst"
import ProfilePosts from "../components/ProfilePosts"
import useAuthStore from "../store/authStore"
import SuggestedUser from "../components/SuggestedUser"
import LeftNav from "../components/LeftNav"
import usePostStore from "../store/postStore"
import SuggestedUserSkelton from "../components/skelton/SuggestedUserSkelton"
import useUserStore from "../store/userStore"
import Notifications from "../components/Notifications"
import NotificationsSkelton from "../components/skelton/NotificationsSkelton"

const Home = () => {
  const { profileShow, activeNav, isNotifications } = useAuthStore()
  const { isGetSuggestedUsers } = useUserStore()
  const { isCreatePost } = usePostStore()
  return (
    <div className=" text-5xl pt-[67px] xl:pt-2 max-w-screen h-screen" >
      <div className="flex justify-center gap-0.5 w-full h-full" >
        <LeftNav />
        <div className="flex flex-col max-w-xl w-full items-center gap-1.5 overflow-hidden h-full" >
          {activeNav == 'home' && <CreatePOst />}
          {activeNav == 'profile' && <div className="overflow-y-auto w-full">
            <Profile />
            <ProfilePosts />
          </div>}

          {activeNav == 'notification' &&
            <div className="w-full" >
              {isNotifications ?
                <NotificationsSkelton /> :
                <Notifications />}
            </div>
          }
          <Modelbox />
        </div>
        {isGetSuggestedUsers ?
          <SuggestedUserSkelton /> :
          <SuggestedUser />
        }
      </div>
    </div>


  )
}

export default Home
