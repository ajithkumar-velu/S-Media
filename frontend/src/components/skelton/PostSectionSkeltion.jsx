
const PostSectionSkeltion = () => {
  const value = Array(7).fill(null)
  return (
    <div>
      {value.map((idx)=>(

      <div key={idx} className="bg-base-200 rounded-b-lg mb-1 " >
        {/* top */}
        <div className="flex justify-between items-center gap-2 px-5 py-2" >
          <div className="flex items-center gap-2" >
            <p className="size-11 rounded-full cursor-pointer skeleton" alt=""></p>
            <div>
              <p className="text-xl font-semibold skeleton w-[150px] h-3 mb-1" ></p>
              <p className="text-xl font-semibold skeleton w-[110px] h-3" ></p>
            </div>
          </div>
          <p className={`btn-sm  py-5 rounded-full skeleton px-[50px]`}  ></p>
        </div>


        {/* body */}
        <div>
          <p className="text-lg ml-5 py-2 my-2 skeleton w-[300px]" ></p>
          <div className=' w-full skeleton h-[300px]' ></div>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-evenly px-5 py-4" >
          <div className="flex items-center gap-1 rounded btn-sm py-5 btn-ghost skeleton w-28" ></div>
          <div className="flex items-center gap-1 rounded btn-sm py-5 btn-ghost skeleton w-28" ></div>
        </div>
      </div>
      ))}

    </div>
  )
}

export default PostSectionSkeltion