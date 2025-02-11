import { useState } from "react"
import useAuthStore from "../store/authStore"


const Modelbox = () => {

    const { authUser, profileUpdate, isOpenModal, setIsOpenModal, isUserInfoUpdate } = useAuthStore()

    const [formData, setFormData] = useState({
        username: authUser.username,
        fullname: authUser.fullname,
        email: authUser.email,
        currentPassword: "",
        newPassword: "",
        bio: authUser.bio,
        link: authUser.link
    })

    const handleProfileUpdate = (e) => {
        let name = e.target.name
        let value = e.target.value

        setFormData({ ...formData, [name]: value })



    }

    const handleSubmit = () => {
        profileUpdate(formData)
        setFormData({username: authUser.username,
            fullname: authUser.fullname,
            email: authUser.email,
            currentPassword: "",
            newPassword: "",
            bio: authUser.bio,
            link: authUser.link})
        // setTimeout(() => {
            
        //     setIsOpenModal(false)
        // }, 500);
    }
    // console.log(formData);

    return (
        

            <div id="my_modal_3" className={`absolute top-0 items-center justify-center w-screen h-screen backdrop-blur-sm ${isOpenModal ? 'flex' : 'hidden'}`}>
                <div className="modal-box bg-base-300 opacity-100">
                    <p className="text-3xl font-bold mb-5 border-b pb-1" >Edit Info</p>

                    <div>


                        <label className="form-control w-full max-w flex flex-col gap-3">
                            {/* username */}
                            <div className="grid grid-cols-2 gap-2" >
                                <div>

                                    <div className="label -mb-4">
                                        <span className="label-text font-semibold">Username</span>
                                    </div>
                                    <input name="username" value={formData.username} onChange={handleProfileUpdate} type="text" placeholder="Username" className="input input-bordered w-full" />
                                </div>

                                <div>

                                    {/* fullname */}
                                    <div className="label -mb-4">
                                        <span className="label-text font-semibold">Fullname</span>
                                    </div>
                                    <input name="fullname" value={formData.fullname} onChange={handleProfileUpdate} type="text" placeholder="Fullname" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div>

                                {/* email */}
                                <div className="label -mb-4">
                                    <span className="label-text font-semibold">Email</span>
                                </div>
                                <input name="email" value={formData.email} onChange={handleProfileUpdate} type="email" placeholder="Email" className="input input-bordered w-full" />
                            </div>
                            <div>


                            </div>
                            <div className="grid grid-cols-2 gap-2" >
                                <div>
                                    {/* currentPassword */}
                                    <div className="label -mb-4">
                                        <span className="label-text font-semibold">Current Password</span>
                                    </div>
                                    <input name="currentPassword" value={formData.currentPassword} onChange={handleProfileUpdate} type="text" placeholder="CurrentPassword" className="input input-bordered w-full" />
                                </div>
                                <div>

                                    {/* newPassword          */}
                                    <div className="label -mb-4">
                                        <span className="label-text font-semibold">New Password</span>
                                    </div>
                                    <input name="newPassword" value={formData.newPassword} onChange={handleProfileUpdate} type="password" placeholder="New Password" className="input input-bordered w-full" />
                                </div>
                            </div>

                            <div>

                                {/* bio                  */}
                                <div className="label -mb-4">
                                    <span className="label-text font-semibold">Bio</span>
                                </div>
                                <input name="bio" value={formData.bio} onChange={handleProfileUpdate} type="text" placeholder="Bio" className="input input-bordered w-full" />
                            </div>
                            <div>

                                {/* link                 */}
                                <div className="label -mb-4">
                                    <span className="label-text font-semibold">Link</span>
                                </div>
                                <input name="link" value={formData.link} onChange={handleProfileUpdate} type="text" placeholder="Link" className="input input-bordered w-full" />
                            </div>

                        </label>

                        <button onClick={() => setIsOpenModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>


                    </div>

                    <div className="text-4xl font-bold mt-5 border-t pt-4 flex gap-2" >

                        <button className="flex-1 btn btn-ghost bg-zinc-700 cursor-pointer" onClick={() => setIsOpenModal(false)} >Discard</button>
                        <button className="flex-1 bg-blue-700 btn cursor-pointer" onClick={handleSubmit} >
                            Save
                            {isUserInfoUpdate &&
                            <p className='loading size-4'></p>}

                        </button>
                    </div>

                </div>
            </div>
        
    )
}

export default Modelbox