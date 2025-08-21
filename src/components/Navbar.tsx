import React from 'react';
import { NavLink } from 'react-router-dom';
import { Notebook as Robot, GamepadIcon, Map, Activity, Users, Code, ClipboardList } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="flex items-center space-x-2">
              <Robot className="w-8 h-8 text-green-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                TurtleBot3
              </span>
            </NavLink>
            
            <div className="hidden md:flex space-x-4">
              <NavLink to="/control" className="nav-link flex items-center space-x-1">
                <GamepadIcon className="w-4 h-4 text-green-400" />
                <span>Control</span>
              </NavLink>
              <NavLink to="/map" className="nav-link flex items-center space-x-1">
                <Map className="w-4 h-4 text-green-400" />
                <span>Map</span>
              </NavLink>
              <NavLink to="/status" className="nav-link flex items-center space-x-1">
                <Activity className="w-4 h-4 text-green-400" />
                <span>Status</span>
              </NavLink>
              <NavLink to="/team" className="nav-link flex items-center space-x-1">
                <Users className="w-4 h-4 text-green-400" />
                <span>Team</span>
              </NavLink>
              <NavLink to="/source" className="nav-link flex items-center space-x-1">
                <Code className="w-4 h-4 text-green-400" />
                <span>Source</span>
              </NavLink>
              <NavLink to="/management" className="nav-link flex items-center space-x-1">
                <ClipboardList className="w-4 h-4 text-green-400" />
                <span>Management</span>
              </NavLink>
            </div>
          </div>
          
          <a href="https://enseirb-matmeca.bordeaux-inp.fr/en" 
             target="_blank" 
             rel="noopener noreferrer"
             className="hidden md:block nav-link text-green-400">
            ENSEIRB-MATMECA
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
