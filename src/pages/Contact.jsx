import { useState } from 'react';
import Navbar from "../components/Navbar"
import { SendHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can integrate it with an API or email service)
    console.log(formData);
    toast.success("Message sent successfully");
  };

  return (
    <div className='h-screen bg-black sm:bg-[#0D0C0C]'>
    <Navbar/>
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-black text-white rounded-lg mt-6 md:mt-32 mb-0">
      <h1 className="text-3xl font-bold text-center sm:text-left">Contact Us</h1>
      <p className="text-lg text-center sm:text-left">
        We would love to hear from you! Please fill out the form below to get in touch with us.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-lg font-semibold">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 text-white rounded-lg focus:outline-none "
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-lg font-semibold">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 text-white rounded-lg  focus:outline-none "
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-lg font-semibold">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-900 text-white rounded-lg  focus:outline-none "
            rows="6"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span className='inline-flex gap-3 text-xl items-center'>Send <SendHorizontal /></span>
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Contact;
