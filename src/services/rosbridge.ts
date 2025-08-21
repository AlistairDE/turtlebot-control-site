import ROSLIB from 'roslib';

class ROSBridge {
  private ros: ROSLIB.Ros;
  private connected: boolean = false;

  constructor() {
    this.ros = new ROSLIB.Ros({
      url: 'ws://192.168.1.101:9090' // <-- METS L'IP DE TON ROBOT ICI
    });

    this.setupConnectionHandlers();
  }

  private setupConnectionHandlers() {
    this.ros.on('connection', () => {
      console.log('✅ Connecté à ROSBridge !');
      this.connected = true;
    });

    this.ros.on('error', (error) => {
      console.error('❌ Erreur de connexion à ROSBridge:', error);
      this.connected = false;
    });

    this.ros.on('close', () => {
      console.log('🔴 Connexion à ROSBridge fermée.');
      this.connected = false;
    });
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public sendVelocityCommand(linear: number, angular: number) {
    const cmdVel = new ROSLIB.Topic({
      ros: this.ros,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    const twist = new ROSLIB.Message({
      linear: { x: linear, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: angular }
    });

    cmdVel.publish(twist);
  }

  public subscribeToStatus(callback: (status: any) => void) {
    const statusTopic = new ROSLIB.Topic({
      ros: this.ros,
      name: '/robot_status',
      messageType: 'std_msgs/String'
    });

    statusTopic.subscribe(callback);
  }
}

export const rosbridge = new ROSBridge();
