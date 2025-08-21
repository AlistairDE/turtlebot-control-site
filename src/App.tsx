import React from 'react';
import { MqttProvider } from './services/MqttContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Control from './pages/Control';
import Map from './pages/Map';
import RobotStatus from './pages/RobotStatus';
import Source from './pages/Source';
import Team from './pages/Team';
import Management from './pages/Management';

/*
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/control" element={<Control />} />
            <Route path="/map" element={<Map />} />
            <Route path="/status" element={<RobotStatus />} />
            <Route path="/source" element={<Source />} />
            <Route path="/team" element={<Team />} />
            <Route path="/management" element={<Management />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}*/

function App() {
  return (
    <MqttProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/control" element={<Control />} />
              <Route path="/map" element={<Map />} />
              <Route path="/status" element={<RobotStatus />} />
              <Route path="/source" element={<Source />} />
              <Route path="/team" element={<Team />} />
              <Route path="/management" element={<Management />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MqttProvider>
  );
}

export default App;