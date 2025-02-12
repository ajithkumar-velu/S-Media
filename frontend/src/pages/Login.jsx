import { useState } from "react"
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import useAuthStore from "../store/authStore"
import Images from "../assets/Assets"
import { Link } from "react-router-dom"
import usePostStore from "../store/postStore"
const Login = () => {
  const { login, isLogin } = useAuthStore()
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  const { getAllPost } = usePostStore()
  const onChangeHandler = (e) => {

    let name = e.target.name
    let value = e.target.value
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }
  // console.log(loginData);

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    login(loginData)
    await getAllPost()
  }

  return (
    <div className="h-screen overflow-hidden pt-[65px] " >
      <div className="h-full md:grid grid-cols-2" >

        {/* Left side */}
        <form onSubmit={onSubmitHandler} className="h-full w-full gap-3 flex items-center justify-center flex-col px-5 pb-20" >

          <p className="text-3xl font-bold mb-4" >Welcome back user</p>

          <label className="input input-bordered w-full max-w-sm flex items-center gap-2">
            <User className="h-4 w-4 opacity-70" />
            <input onChange={onChangeHandler} name="username" value={loginData.username} type="text" className="grow" placeholder="Username" />
          </label>
          <label className="input input-bordered w-full max-w-sm flex items-center gap-2">
            <Lock className="h-4 w-4 opacity-70" />
            <input onChange={onChangeHandler} name="password" type={isPasswordShow ? "text" : "password"} className="grow" placeholder="••••••••" value={loginData.password} />
            <div className=" cursor-pointer" onClick={() => setIsPasswordShow(!isPasswordShow)} >
              {!isPasswordShow ?
                <Eye className="h-4 w-4 opacity-70" />
                : <EyeOff className="h-4 w-4 opacity-70" />
              }
            </div>
          </label>
          <div className="flex justify-end max-w-sm w-full text-sm mb-2" >

            <p className=" self-end " >Don&#8216;t have an account? <Link className=" text-blue-500 link" to={'/signin'} >Signup</Link></p>
          </div>
          <button type="submit" className="btn btn-ghost w-full max-w-sm bg-blue-700 text-white">{isLogin ?
            <div className="flex items-center" >Please wait..
              <p className="loading size-4 ml-2" ></p>
            </div>
            : 'Login'}
          </button>
          
        </form>

        {/* Right Side */}
        <div className="items-center hidden md:flex bg-white " >
          <img className="" src={Images.login} alt="" />
        </div>
      </div>

    </div>
  )
}

export default Login