import React from 'react';
import { Linkedin } from 'lucide-react';
import Fatima from '../assets/images/team/fatima.jpeg';
import Alistair from '../assets/images/team/alistair.jpeg';
import Melia from '../assets/images/team/melia.jpg';
import Clara from '../assets/images/team/clara.jpeg';
import Arthur from '../assets/images/team/arthur.jpeg';
import Philipe from '../assets/images/team/philippe.jpeg';
import Ouessant from '../assets/images/team/ouessant.jpeg';
import Richardson from '../assets/images/team/richardson.jpeg';

import Linkedin_logo from '../assets/images/linkedin-logo.png';

const teamMembers = [
  {
    name: 'Fatima Azeroual',
    role: 'Telecom Engineering Student - Networks',
    image: Fatima,
    linkedin: 'https://www.linkedin.com/in/fazeroual/'
  },
  {
    name: 'Alistair Dreux-Egger',
    role: 'Telecom Engineering Student - Networks',
    image: Alistair,
    linkedin: 'https://www.linkedin.com/in/alistair-dreux-egger-0a16a3212/'
  },
  {
    name: 'Mélia Enilorac',
    role: 'Telecom Engineering Student - Networks',
    image: Melia,
    linkedin: 'https://www.linkedin.com/in/m%C3%A9lia-enilorac-9a94b4242/'
  },
  {
    name: 'Clara Kampetenga',
    role: 'Telecom Engineering Student - Software',
    image: Clara,
    linkedin: 'https://www.linkedin.com/in/clara-kampetenga/'
  },
  {
    name: 'Arthur Meunier',
    role: 'Telecom Engineering Student - Networks',
    image: Arthur,
    linkedin: 'https://www.linkedin.com/in/arthur-meunier/'
  },
  {
    name: 'Philippe Mocquery',
    role: 'Telecom Engineering Student - Software',
    image: Philipe,
    linkedin: 'https://www.linkedin.com/in/philippe-mocquery-00a356296/'
  },
  {
    name: 'Ouessant Sourget--Langlois',
    role: 'Telecom Engineering Student - Signal',
    image: Ouessant,
    linkedin: 'https://www.linkedin.com/in/ouessant-sourget-langlois-2068172b8/'
  },
  {
    name: 'Richardson Tabopda Yemele',
    role: 'Telecom Engineering Student - Networks',
    image: Richardson,
    linkedin: 'https://www.linkedin.com/in/richardson-yemele-5a32a524a/'
  }
];

const supervisors = [
  {
    name: 'Hasnaa Aniss',
    role: 'Research Engineer at Université Gustave Eiffel',
    image: Linkedin_logo,
    linkedin: 'https://www.linkedin.com/in/hasnaa-aniss-5581b756/'
  },
  {
    name: 'Mohammed Coulibaly',
    role: 'Software Development Engineer',
    image: Linkedin_logo,
    linkedin: 'https://www.linkedin.com/in/mohamed-coulibaly-938914154/'
  },
  {
    name: 'Tidiane Sylla',
    role: 'Researcher at Université Gustave Eiffel',
    image: Linkedin_logo,
    linkedin: 'https://www.linkedin.com/in/tidiane-sylla-ph-d-b3b39548/'
  },
];

const PersonCard = ({ name, role, image, linkedin }: any) => (
  <div className="hover-card">
    <img
      src={image}
      alt={name}
      className="w-full h-64 object-cover rounded-lg"
    />
    <div className="overlay rounded-lg">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-300 mb-4">{role}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span>Connect</span>
        </a>
      </div>
    </div>
  </div>
);

const Team = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Who are we?
      </h1>

      <div className="mb-16">
        <div className="bg-gray-900 rounded-lg p-8 neon-border mb-8">
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-300 mb-4">
            We are a team of eight engineering students specializing in Telecommunications at ENSEIRB-MATMECA, working on the AUTOMA project.
          </p>
          <p className="text-gray-300">
            Our mission: Designing a fleet of automated and connected vehicles by integrating obstacle detection technologies, inter-vehicle communication (ITS-G5), and remote operation with robots. We combine our skills in programming (C++, Python, HTML), robotics, and communication networks to achieve our goal.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-green-400">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {teamMembers.map((member, index) => (
            <PersonCard key={index} {...member} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-green-400">Project Supervisors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supervisors.map((supervisor, index) => (
            <PersonCard key={index} {...supervisor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
