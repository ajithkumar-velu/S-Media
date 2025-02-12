
import usePostStore from '../../store/postStore'


const CreatePostSkelton = () => {
    const { isCreatePost } = usePostStore()
    return isCreatePost && (

        <div className="bg-base-200 px-5 py-4 rounded-lg h-32 w-full" >
            {/* post text */}
            <div className="flex gap-2 items-center w-full" >

                <p src={"avatar-placeholder.png"} className="w-11 rounded-full h-11 skeleton" alt=""></p>
                <p  type="text" placeholder="Start a post" className="flex-1 input  w-full  rounded-full skeleton" ></p>
                {/* post image */}
                
                <div className='w-11 h-11 skeleton rounded-full' ></div>
            </div>
            {/* post selected image */}
            
            <div>
                <button  className="btn float-end px-14 rounded-full mt-3 flex items-center skeleton" >
                    
                        
                </button>
            </div>
        </div>
    )
}

export default CreatePostSkelton