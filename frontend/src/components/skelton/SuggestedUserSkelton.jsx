import React from 'react'

const SuggestedUserSkelton = () => {
    const value = Array(4).fill(null)
  return (
    <div className='bg-base-200 hidden md:block rounded-lg px-5 py-3 h-fit w-full max-w-xs' >
            <h2 className='text-2xl font-bold mb-2' >Who to follow</h2>

            {value.map((idx) => (

                <div key={idx} className='flex justify-between items-center gap-8 mb-2' >
                    <div className='flex items-center gap-2 cursor-pointer' >
                        <div className='w-10 h-10 rounded-full overflow-hidden skeleton' >
                        </div>
                        <div className='text-[18px]' >
                            <p className='font-semibold w-[100px] h-3 skeleton' ></p>
                            <p className='font-semibold mt-1 w-[60px] h-3 skeleton' ></p>
                        </div>
                    </div>
                    <button  className='text-[15px] btn-sm skeleton px-12 rounded-full' ></button>
                </div>
            ))} 
            

        </div>
  )
}

export default SuggestedUserSkelton