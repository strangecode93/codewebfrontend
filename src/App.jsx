import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editior';
import { Toaster } from 'react-hot-toast';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';

function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
    <BrowserRouter>
      <Routes>
        
          <Route path='/' element={isLoggedIn === "true" ? <Home /> : <Navigate to="/login" />} />
          <Route path='/about' element={isLoggedIn === "true" ? <About/> : <Navigate to="/login" />} />
          <Route path='/contact' element={isLoggedIn === "true" ? <Contact/> : <Navigate to="/login" />} />
          <Route path='/services' element={isLoggedIn === "true" ? <Services/> : <Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/editor/:projectID" element={isLoggedIn === "true" ? <Editor/> : <Navigate to="/login" />} />
          <Route path="*" element={<NoPage />} />
        
      </Routes>
      <Toaster />
    </BrowserRouter>
    </>
  )
}

export default App
