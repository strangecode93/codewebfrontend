import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, SquareCode } from "lucide-react";
import image from "../images/login.png";
import toast from "react-hot-toast";
import { api_base_url } from "../helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    await fetch(api_base_url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userId); // Use data.userId instead of data.user.Id
          toast.success("Login Successful");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        toast.error("An error occurred during login.");
      });
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
        <form onSubmit={submitForm} className="w-full">
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
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </p>
          <button className="btnBlue w-full mt-[20px] text-center bg-blue-600 text-white py-2 rounded flex items-center justify-center gap-1 hover:bg-blue-700">
            Login
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

export default Login;
