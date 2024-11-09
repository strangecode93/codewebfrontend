/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Contact, DoorOpen, DraftingCompass, LayoutGrid, ListCollapse, Moon, NotebookTabs, SquareCode} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import { api_base_url, toggleClass } from '../helper';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
const Navbar = ({isGridLayout, setIsGridLayout}) => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      })
    }).then((res) => res.json()).then((data) => {
      if(data.success === true) {
        setData(data.user);
      } else {
        setError(data.message);
      }
    })
  },[])
  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    toast.success("Logout Successfully");
    navigate("/login");
  }
  return (
    <div className="navbar flex items-center justify-between px-[10px] md:px-[100px] h-[80px] bg-[#141414]">
      <Link to={"/"}>
      <h1 className="text-2xl md:text-4xl inline-flex items-center gap-2"><SquareCode size={32}/><span>code<span className="text-blue-600">web</span></span></h1>
      </Link>
      <div className='flex items-center gap-2 md:gap-5'>
        <Link to={"/about"}><NotebookTabs /></Link>
        <Link to={"/contact"}><Contact /></Link>
        <Link to={"/services"}><DraftingCompass /></Link>
        <button onClick={logout} className='btnBlue !text-[16px] !bg-zinc-700 !px-2 !py-1'><DoorOpen /></button>
        <Avatar onClick={()=>{toggleClass(".dropDownNavabr", "hidden")}} name={data ? data.name : ""} size='40' round="50%" className='cursor-pointer'/>
      </div>
      <div className='dropDownNavabr hidden absolute right-[10px] md:right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] bg-[#1A1919] w-[150px] h-[155px] rounded-md'>
      {/* <h3 className='text-xl mb-2'>code<span className='text-blue-600'>web</span></h3> */}
      <h3 className='text-xl mb-2 text-blue-500'>{data ? data.name : "codeweb"}</h3>
      <hr />
      <h1 className='flex items-center gap-2 text-[20px] cursor-pointer p-2 bg-zinc-800 my-2 rounded-md'><Moon /></h1>
      <h1 onClick={() => setIsGridLayout(!isGridLayout)} className='flex items-center gap-2 text-[20px] cursor-pointer p-2 bg-zinc-800 my-2 rounded-md'>{!isGridLayout ? <LayoutGrid /> : <ListCollapse />}</h1>
      </div>
    </div>
  )
}

export default Navbar