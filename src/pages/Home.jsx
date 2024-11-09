/* eslint-disable no-unused-vars */
import { CirclePlus, PencilRuler, X } from "lucide-react"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import GridCard from "../components/GridCard"
import ListCard from "../components/ListCard"
import { api_base_url } from "../helper"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [isGridLayout, setIsGridLayout] = useState(false)
  const [projectTitle, setProjectTitle] = useState("")
  const [isCreateModelShow, setIsCreateModelShow] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState("")
  const [userData, setUserData] = useState(null)
  const [userError, setUserError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  // Filter data based on the search query
  const filterData = data
    ? data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const createProject = () => {
    if (projectTitle === "") {
      toast.error("Please enter a project name")
    } else {
      fetch(api_base_url + "/createProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          title: projectTitle,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            toast.success(data.message)
            setIsCreateModelShow(false)
            setProjectTitle("")
            navigate(`/editor/${data.projectId}`)
          } else {
            toast.error(data.message)
          }
        })
    }
  }

  const getProject = () => {
    fetch(api_base_url + "/getProjects", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setData(data.projects)
        } else {
          setError(data.message)
        }
      })
  }

  useEffect(() => {
    getProject()
  }, []);

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
        setUserData(data.user);
      } else {
        setUserError(data.message);
      }
    })
  },[])

  return (
    <div>
      <Navbar isGridLayout={isGridLayout} setIsGridLayout={setIsGridLayout} />
      <div className="flex items-center justify-between px-[10px] md:px-[100px] my-[40px]">
        <h2 className="text-xl md:text-4xl">Hi, {userData?userData.username : "coder"} :)</h2>
        <div className="flex items-center gap-1">
          <div className="inputBox w-auto md:!w-[350px]">
            {/* Bind the input value to searchQuery and update it on change */}
            <input
              type="text"
              placeholder="Search Here..."
              value={searchQuery} // bind to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // update state on input change
            />
          </div>
          <button className="btnBlue" onClick={() => setIsCreateModelShow(true)}>
            <PencilRuler />
          </button>
        </div>
      </div>
      <div className="cards">
        {isGridLayout ? (
          <div className="grid px-[100px]">
            {filterData.length > 0 ? (
              filterData.map((item, index) => <GridCard key={index} item={item} />)
            ) : (
              <p>No projects found</p>
            )}
          </div>
        ) : (
          <div className="list px-[10px] md:px-[100px]">
            {filterData.length > 0 ? (
              filterData.map((item, index) => <ListCard key={index} item={item} />)
            ) : (
              <p>No projects found</p>
            )}
          </div>
        )}
      </div>

      {/* Modal for creating a new project */}
      {isCreateModelShow && (
        <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[90vw] md:w-[30vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h1 className="text-3xl">Create new project</h1>
            <div className="inputBox !bg-[#202020]">
              <input
                onChange={(e) => setProjectTitle(e.target.value)}
                value={projectTitle}
                type="text"
                placeholder="Project Name"
              />
            </div>
            <div className="flex w-full items-center gap-[10px] text-xs md:text-xl mt-5">
              <button
                onClick={createProject}
                className="p-[10px] rounded-lg bg-blue-600 cursor-pointer min-w-[49%]"
              >
                <CirclePlus />
              </button>
              <button
                onClick={() => setIsCreateModelShow(false)}
                className="p-[10px] rounded-lg bg-zinc-600 cursor-pointer min-w-[49%]"
              >
                <X />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
