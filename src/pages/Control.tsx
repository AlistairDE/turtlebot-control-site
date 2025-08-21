import React, { useContext, useEffect, useState } from 'react';
import { publishMessage } from '../services/mqttService';
import { MqttContext } from '../services/MqttContext';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  StopCircle,
} from 'lucide-react';

// Identifiants des robots pilotables
const ROBOTS = ['robot1', 'robot2'] as const;
type RobotId = typeof ROBOTS[number];

const Control = () => {
  const { connected } = useContext(MqttContext);
  const [speed, setSpeed] = useState(0.5);
  const [activeRobot, setActiveRobot] = useState<RobotId>('robot1');

  // Envoi des commandes
  const handleMove = (linear: number, angular: number) => {
    if (!connected) {
      console.error("Impossible d'envoyer la commande : non connecté au broker MQTT");
      return;
    }

    const command = JSON.stringify({
      linear: { x: linear * speed, y: 0.0, z: 0.0 },
      angular: { x: 0.0, y: 0.0, z: angular * speed },
    });

    publishMessage('robot/cmd_vel', command);
    console.log(`Commande envoyée : ${command}`);
  };

  const handleStop = () => {
    publishMessage('robot/cmd_vel', JSON.stringify({ linear: 0, angular: 0 }));
    console.log("Commande d'arrêt envoyée");
  };

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          handleMove(0.5, 0);
          break;
        case 'ArrowDown':
          handleMove(-0.5, 0);
          break;
        case 'ArrowLeft':
          handleMove(0, 0.5);
          break;
        case 'ArrowRight':
          handleMove(0, -0.5);
          break;
        case ' ':
          handleStop();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, handleStop]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Titre global en haut */}
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Robot Control
      </h1>

      {/* Onglets horizontaux alignés à gauche */}
      <div className="flex justify-start space-x-2 mb-0 ml-4">
        {ROBOTS.map((id) => (
          <button
            key={id}
            onClick={() => setActiveRobot(id)}
            className={`px-6 py-3 rounded-t-2xl neon-border bg-gray-900 transition-colors border-b-0 -mb-px ${
              activeRobot === id
                ? 'border-green-500 text-green-400'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {id.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Panneau de contrôle principal */}
      <div className="bg-gray-900 rounded-2xl p-8 neon-border">
        {/* Infos */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">Robot sélectionné :</span>
            <span className="font-semibold uppercase">{activeRobot}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">Connection Status:</span>
            <span className={`px-3 py-1 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}>
              {connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <span className="text-lg">Speed:</span>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="flex-grow"
            />
            <span className="w-12 text-right">{speed.toFixed(1)}</span>
          </div>
        </div>

        {/* Boutons directionnels */}
        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          <div></div>
          <button
            onClick={() => handleMove(0.5, 0)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowUp className="w-8 h-8 mx-auto" />
          </button>
          <div></div>

          <button
            onClick={() => handleMove(0, 0.5)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-8 h-8 mx-auto" />
          </button>

          <button
            onClick={handleStop}
            className="p-4 bg-red-900 rounded-lg hover:bg-red-800 transition-colors"
          >
            <StopCircle className="w-8 h-8 mx-auto" />
          </button>

          <button
            onClick={() => handleMove(0, -0.5)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowRight className="w-8 h-8 mx-auto" />
          </button>

          <div></div>
          <button
            onClick={() => handleMove(-0.5, 0)}
            className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowDown className="w-8 h-8 mx-auto" />
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Control;
