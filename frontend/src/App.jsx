import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signin from './pages/Signin'
import { Toaster } from 'react-hot-toast'
import useAuthStore from './store/authStore'
import { useEffect, useState } from 'react'
import { ChartNetwork, Loader } from 'lucide-react'
import Navbar from './components/Navbar'
import usePostStore from './store/postStore'
import PureModal from 'react-pure-modal';
import useUserStore from './store/userStore'

const App = () => {
  const { authUser, check, isChecking } = useAuthStore()
  const { posts, getAllPost, getLikedPosts, setPostvalues, getFollowingPosts } = usePostStore()
  const { getSuggestedUsers} = useUserStore()
  const [modal, setModal] = useState(false);

  useEffect(() => {
    check()

  }, [check])
  useEffect(()=>{
    getAllPost()
    getSuggestedUsers()
  }, [])


  if (isChecking) {
    return (
      <div className='h-screen flex items-center justify-center' >
        <Loader className='loading' />
      </div>
    )
  }
// console.log(authUser);

  return (
    <div>      
      <Navbar />
      
      <Toaster />
      <Routes >
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signin" element={authUser ? <Navigate to="/" /> : <Signin />} />
      </Routes>

    </div>
  )
}

export default App