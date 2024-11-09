import Navbar from "../components/Navbar";

const servicesData = [
  {
    title: 'Code Editor',
    description: 'Our IDE provides a powerful and intuitive code editor with syntax highlighting, auto-completion, and error detection to enhance your coding experience.',
  },
  {
    title: 'Cloud Storage',
    description: 'Save your projects securely in the cloud. Access them anytime, from any device, ensuring that your work is never lost.',
  },
  {
    title: 'Collaboration Tools',
    description: 'Collaborate in real-time with other developers. Share your projects and work together seamlessly on the same codebase.',
  },
  {
    title: 'Code Execution',
    description: 'Instantly run your code within our integrated terminal. Supports multiple programming languages for quick testing and debugging.',
  },
  {
    title: 'Version Control',
    description: 'Keep track of your code changes with our built-in version control system. Easily roll back to previous versions if needed.',
  },
  {
    title: 'Custom Themes',
    description: 'Personalize your coding environment with a wide range of themes. Switch between light and dark mode to suit your preferences.',
  },
];

const Services = () => {
  return (
    <div className="h-screen bg-black sm:bg-[#0D0C0C]">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 space-y-12 bg-black text-white mt-6 md:mt-32">
      <h1 className="text-3xl font-bold text-center sm:text-left">Our Services</h1>
      <p className="text-lg text-center sm:text-left">
        Explore the wide range of services we offer to enhance your coding experience. From a powerful code editor to cloud storage and collaboration tools, we have everything you need.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-400">{service.title}</h2>
            <p className="text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Services;
