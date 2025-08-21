import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-4">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} ENSEIRB-MATMECA AUTOMA Project. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;