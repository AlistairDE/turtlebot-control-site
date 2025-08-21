import React, { useContext, useEffect, useRef, useState } from 'react';
import { MqttContext } from '../services/MqttContext';
import { publishMessage } from '../services/mqttService';

// Identifiants des robots
const ROBOTS = ['robot1', 'robot2'] as const;
type RobotId = typeof ROBOTS[number];

const Map = () => {
  const { connected, subscribe } = useContext(MqttContext);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastUpdateRef = useRef<number | null>(null);
  const [activeRobot, setActiveRobot] = useState<RobotId>('robot1');
  const [obstacleAhead, setObstacleAhead] = useState(false);
  const [cameraImage, setCameraImage] = useState<string | null>(null);

  // Souscription LiDAR et caméra
  useEffect(() => {
    if (!connected) return;

    const topicLidar = `${activeRobot}/lidar`;
    const topicObstacle = `${activeRobot}/obstacle_ahead`;
    const topicCamera = `${activeRobot}/camera_feed`;


    const offLidar = subscribe(topicLidar, (message) => {
      try {
        const lidarData = JSON.parse(message);
        drawLidarData(lidarData);
      } catch (err) {
        console.error('Erreur lors du parsing des données LIdar :', err);
      }
    });

    const offObstacle = subscribe(topicObstacle, (message) => {
      try {
        const data = JSON.parse(message);
        if (data?.obstacle_ahead !== undefined) {
          setObstacleAhead(data.obstacle_ahead);
        }
      } catch (err) {
        console.error('Parsing Obstacle :', err);
      }
    });

    const offCamera = subscribe(topicCamera, (message) => {
      try {
          setCameraImage(`data:image/jpeg;base64,${message}`);
        
      } catch (err) {
        console.error('Erreur lors du parsing de l\'image de la caméra :', err);
      }
    });

    return () => {
      offLidar();
      offObstacle();
      offCamera();
      console.log('Nettoyage des abonnements');
    };
  }, [connected, subscribe, activeRobot]); 


  /** Dessin LiDAR sur canvas */
  const drawLidarData = (data: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
     
    //dessiner les points du lidar
    const { angle_min, angle_increment, ranges, range_min, range_max } = data;
    const rotationOffset = (90 * Math.PI) / 180;

    ranges.forEach((range: number, i: number) => {
      if (range < range_min || range > range_max) return; //ignorer les valauers hors de portée
      const angle = angle_min + i * angle_increment + rotationOffset;
      const x = canvas.width / 2 + range * Math.cos(angle) * 100;
      const y = canvas.height / 2 - range * Math.sin(angle) * 100;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = range < 0.3 ? 'red' : 'green';
      ctx.fill();
    });
  };


  return (
    <div className="max-w-6xl mx-auto">
      {/* Titre */}
      <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        Robot Map
      </h1>

      {/* Intercalaires */}
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

      {/* Contenu principal */}
      <div className="bg-gray-900 rounded-2xl p-8 neon-border">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg">Connection Status:</span>
          <span className={`px-3 py-1 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}>{
            connected ? 'Connected' : 'Disconnected'
          }</span>
        </div>

        {obstacleAhead && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
            ⚠️ Obstacle détecté ! Le robot a été arrêté.
          </div>
        )}

        {/* Flux caméra + LiDAR */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Caméra */}
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center overflow-hidden">
            {connected ? (
              <img src={cameraImage} alt="Camera feed" className="object-contain w-full h-full" />
            ) : (
              <span className="text-red-400">Connect to view camera</span>
            )}
          </div>

          {/* LiDAR */}
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            {connected ? (
              <canvas ref={canvasRef} width={500} height={600} className="border border-gray-700" />
            ) : (
              <span className="text-red-400">Connect to view LiDAR</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
