import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, SquareCode } from "lucide-react";
import image from "../images/password.png";
import { api_base_url } from "../helper";
import toast from "react-hot-toast";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    await fetch(api_base_url + "/signup", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: password,
      }),
    }).then((res) => res.json()).then((data) => {
      if(data.success === true) {
        toast.success("Sign up Successfull");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    })
    // console.log(username, name, email, password);
  };

  return (
    <div className="container w-screen min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between md:pl-[100px]">
      {/* Left Section (Form) */}
      <div className="left w-[90%] md:w-[40%] p-6 md:p-0 mx-auto md:mx-0">
        <h1 className="text-4xl inline-flex items-center gap-2 mb-5">
          <SquareCode size={32} />
          <span>
            code<span className="text-blue-600">web</span>
          </span>
        </h1>
        <form onSubmit={submitForm} className="w-full" action="">
          <div className="inputBox mb-4">
            <input
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="inputBox mb-4">
            <input
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="inputBox mb-4">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="inputBox mb-4">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <p className="text-gray-500 mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
          <button className="btnBlue w-full mt-[20px] text-center bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-1 hover:bg-blue-700">
            Signup
            <ChevronRight />
          </button>
        </form>
      </div>

      {/* Right Section (Image) */}
      <div className="right hidden md:flex md:w-[50%]">
        <img
          className="h-[50vh] w-auto object-cover rounded-md opacity-80"
          src={image}
          alt=""
        />
      </div>
    </div>
  );
};

export default SignUp;
