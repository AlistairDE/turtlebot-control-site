import React, { useContext, useEffect, useState } from 'react';
import { MqttContext } from '../services/MqttContext';
import { Battery, Wifi, Cpu, Thermometer } from 'lucide-react';

const ROBOTS = ['robot1', 'robot2'] as const;
type RobotId = typeof ROBOTS[number];

const fixNegativeZero = (val: number) => {
  const num = parseFloat(val.toFixed(1));
  return num === 0 ? '0.0' : num.toFixed(1);
};

// Conversion nous même de la valeur de la batterie
const voltageToPercent = (v) => {
  const curve = [
    [12.60,100],[12.53,95],[12.46,90],[12.39,85],[12.32,80],
    [12.26,75],[12.19,70],[12.12,65],[12.06,60],[11.99,55],
    [11.92,50],[11.85,45],[11.78,40],[11.70,35],[11.63,30],
    [11.56,25],[11.48,20],[11.40,15],[11.30,10],[11.10,5],
    [10.80,0]
  ];
  for (let i = 0; i < curve.length - 1; i++) {
    const [vh, ph] = curve[i];
    const [vl, pl] = curve[i + 1];
    if (v >= vl && v <= vh) {
      const t = (v - vl) / (vh - vl);           // interpolation linéaire
      return Math.round(pl + t * (ph - pl));    // % entier
    }
  }
  return 0;
};


const RobotStatus = () => {
  const { connected, subscribe } = useContext(MqttContext);
  const [activeRobot, setActiveRobot] = useState<RobotId>('robot1');
  const [status, setStatus] = useState({ battery: '--', velocity: '--', cpu: '--', wifi: '--' });

  useEffect(() => {
    if (!connected) return;

    let latestVelocity: number[] | null = null;

    // on s'abonne aux topics en fonction de l'ID dur robot actif
    const batteryTopic = `${activeRobot}/battery_state`;
    const jointStatesTopic = `${activeRobot}/joint_states`;


    subscribe(batteryTopic, (msg) => {

      try {
        const data = JSON.parse(msg);
        if (data?.percentage !== undefined) {
          setStatus((prev) => ({ ...prev,
            battery: `${voltageToPercent(data.voltage)}`,
            voltage: data.voltage.toFixed(2),
           }));
        }
      } catch (err) {
        console.error('Erreur batterie:', err);
      }
    });

    subscribe(jointStatesTopic, (msg) => {
      try {
        const data = JSON.parse(msg);
        if (data?.velocity) latestVelocity = data.velocity;
      } catch (err) {
        console.error('Erreur vitesse:', err);
      }
    });

    const id = setInterval(() => {
      if (latestVelocity) {
        setStatus((prev) => ({
          ...prev,
          velocity: `Left: ${fixNegativeZero(latestVelocity[0])} m/s, Right: ${fixNegativeZero(latestVelocity[1])} m/s`,
        }));
      }
    }, 500);
    return () => clearInterval(id);
  }, [connected, subscribe]);

  const StatusCard = ({ icon: Icon, title, value, unit }: any) => (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-3xl font-bold text-white">
        {value}
        <span className="text-lg text-gray-400 ml-1">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Titre */}
      <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Robot Status
      </h1>

      <div className="flex justify-start space-x-2 mb-0 ml-4">
        {ROBOTS.map((id) => (
          <button
            key={id}
            onClick={() => setActiveRobot(id)}
            className={`px-6 py-3 rounded-t-2xl neon-border bg-gray-900 transition-colors border-b-0 -mb-px ${
              activeRobot === id ? 'border-green-500 text-green-400' : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Bloc principal */}
      <div className="bg-gray-900 rounded-2xl p-8 neon-border">
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg">Connection Status:</span>
          <span className={`px-3 py-1 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          <StatusCard icon={Battery} title="Battery" value={connected ? `${status.battery}%` : '--'} unit="" />
          <StatusCard icon={Thermometer} title="Velocity" value={connected ? status.velocity : '--'} unit="" />
          {/*<StatusCard icon={Cpu} title="CPU Usage" value={connected ? status.cpu : '--'} unit="%" />
          <StatusCard icon={Wifi} title="Signal Strength" value={connected ? status.wifi : '--'} unit="dBm" />*/}
        </div>
      </div>
    </div>
  );
};

export default RobotStatus;
