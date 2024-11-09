/* eslint-disable react/prop-types */
import { Binary, Eraser, Trash, X } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { api_base_url } from "../helper"
import { useNavigate } from "react-router-dom"


const GridCard = ({item}) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false)
  const deleteProject = (id) => {
    fetch(api_base_url + "/deleteProject/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json())
    .then(data => {
      if(data.success === true) {
        toast.success(data.message);
        setIsDeleteModelShow(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.message);
        setIsDeleteModelShow(false);
      }
    })
  }
  return (
    <>
    <div className="gridCard bg-[#141414] w-[270px] h-[160px] p-[10px] hover:bg-[#202020] cursor-pointer rounded-lg">
      <div onClick={() => navigate(`/editor/${item._id}`)}>
    <Binary size={72} className="text-purple-500"/>
    <h3 className="text-[20px] w-[90%] line-clamp-1">{item.title}</h3>
    </div>
    <div className="flex items-center justify-between">
      <p className="text-[14px] text-gray-400">created on {new Date(item.date).toDateString()}</p>
      <Eraser onClick={() => setIsDeleteModelShow(true)} size={32} className="text-red-500 cursor-pointer mr-4"/>
    </div>
    </div>
    {
      isDeleteModelShow ? 
      <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
      <div className="mainModel w-[90vw] md:w-[30vw] h-[20vh] bg-[#141414] rounded-lg p-[20px]">
        <h1 className="text-3xl">Do you want to delete <br /> this project?</h1>
        <div className="flex w-full items-center gap-[10px] text-xs md:text-xl mt-5">
          <button onClick={() => {deleteProject(item._id)}} className="p-[10px] rounded-lg bg-red-500 cursor-pointer min-w-[49%]"><Trash /></button>
          <button onClick={() => setIsDeleteModelShow(false)} className="p-[10px] rounded-lg bg-zinc-600 cursor-pointer min-w-[49%]"><X /></button>
        </div>
      </div>
    </div>
      : null
    }
    </>
  )
}

export default GridCard