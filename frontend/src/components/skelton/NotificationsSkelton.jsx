import { ArrowLeft, Trash } from "lucide-react"

const NotificationsSkelton = () => {
    const val = Array(20).fill(null)
  return (
    <div className="w-full max-w-xl rounded-lg pb-5 bg-base-200 h-fit mb-1 overflow-auto" >

            <div className="bg-base-300 flex justify-between items-center px-3" >
                <div className="flex gap-2 items-center" >
                    <div className="btn btn-circle btn-ghost" >
                        <ArrowLeft />
                    </div>
                    <p className="text-[28px] font-bold py-4" >Notifications</p>
                </div>
                <div className="btn btn-circle btn-ghost" >
                    <Trash className="w-6 h-6" />
                </div>
            </div>
            {val.map((notify, idx) => (

                <div key={idx} className="flex justify-between items-center py-3 px-5" >
                    <div className="flex gap-3 items-center" >
                        <p src={"./avatar-placeholder.png"} className="size-11 skeleton rounded-full cursor-pointer" alt="" ></p>
                        <div >
                            <p className="text-[18px] skeleton font-semibold mb-2 w-[100px] h-3" ></p>
                            <p className="text-[14px] text-zinc-400 w-[200px] h-3 skeleton" ></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3" >
                        <p className="text-[14px] text-zinc-400 skeleton w-[100px] h-3" ></p>
                        <p className="btn btn-sm btn-ghost btn-circle text-[20px] items-center justify-center text-red-600  w-[30px] h-3 skeleton" ><p className="" ></p></p>
                    </div>
                </div>
            ))}
        </div>
  )
}

export default NotificationsSkelton