import React, { createContext, useEffect, useState, ReactNode } from 'react';
import client, { onConnect, subscribeToTopic } from './mqttService.js';

// Définir le type pour le contexte
interface MqttContextType {
  connected: boolean;
  subscribe: (topic: string, callback: (message: string) => void) => void;
}

// Créer le contexte avec un type par défaut
export const MqttContext = createContext<MqttContextType | undefined>(undefined);

// Définir le type pour les props de MqttProvider
interface MqttProviderProps {
  children: ReactNode;
}

export const MqttProvider: React.FC<MqttProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Vérification de la connexion au broker MQTT
    onConnect((isConnected) => {
      setConnected(isConnected);
    });

    return () => {
      if (client.connected) {
        console.log('Déconnexion du client MQTT');
        client.end(); // Déconnecte le client MQTT lorsque le composant est démonté
      }
    };
  }, []);

  const subscribe = (topic: string, callback: (message: string) => void) => {
    subscribeToTopic(topic, callback);
  };

  

  return (
    <MqttContext.Provider value={{ connected, subscribe }}>
      {children}
    </MqttContext.Provider>
  );
};