import React from 'react';
import homeImage from '../assets/images/image_home.png';


const Home = () => {
  return (
    <div className="space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-green-500">
          TurtleBot3 Waffle Pi
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Advanced robotics platform for research and development in autonomous navigation and fleet management
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-lg p-6 neon-border">
          <img 
            src={homeImage}
            alt="Robot"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Project Overview</h2>
          <p className="text-gray-300">
            The TurtleBot3 Waffle Pi is at the heart of our AUTOMA project, 
            serving as a testbed for advanced autonomous navigation, obstacle detection, 
            and inter-vehicle communication systems.
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 neon-border">
          <h2 className="text-2xl font-bold mb-4">Key Specifications</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
              360° LiDAR Scanner
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              Raspberry Pi 3 Model B+
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              OpenCR Control Board
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
              Intel® RealSense™ R200
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-purple-500 rounded-full mr-2"></span>
              Dynamixel Motors
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
