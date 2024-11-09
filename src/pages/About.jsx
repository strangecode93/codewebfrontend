import { Github, Mail } from "lucide-react"
import Navbar from "../components/Navbar"


const About = () => {
  return (
    <div className='h-screen bg-black sm:bg-[#0D0C0C]'>
        <Navbar/>
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-black text-white mt-6 md:mt-32">
      <h1 className="text-3xl font-bold text-center sm:text-left">About Our Coding IDE</h1>
      <p className="text-lg text-center sm:text-left">
        Welcome to code<span className="text-blue-500">web</span> This platform allows you to write, test, and save your code in a seamless and user-friendly environment.
      </p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🔑️ Authentication </h2>
        <p className="text-gray-300">
          To ensure the security and personalized experience of our users, we provide authentication functionality. You can sign up or log in using your email and password to securely access your workspace. Once logged in, your projects and settings are saved and accessible across devices.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🧰️ Saving Functionality </h2>
        <p className="text-gray-300">
          Our IDE allows you to save your code projects with ease. After logging in, all your code files are stored securely in the cloud, ensuring that you never lose your work. You can also access your saved projects at any time from any device.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🏗️ How it Works </h2>
        <p className="text-gray-300">
          Once you log in, your work is automatically saved as you type. You can manually save your project at any time using the save button, or our auto-save feature will take care of it for you. With authentication, only you can access and edit your saved projects, giving you full control over your workspace.
        </p>
      </section>
      <div className="flex items-center gap-4">
      <p className="cursor-pointer">
      <a
        href="https://github.com/Somilg11"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
      >
        <Github />
      </a>
      </p>
      <p className="cursor-pointer">
      <a
        href="mailto:strangecode93@gmail.com"
        className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
      >
        <Mail />
      </a>
      </p>
      </div>
    </div>
    </div>
  )
}

export default About