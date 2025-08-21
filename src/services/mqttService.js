import mqtt from 'mqtt';

const MQTT_BROKER =  'ws://13.53.65.6:9001';
const topic= 'robot/#';
const client = mqtt.connect(MQTT_BROKER);
// Stockage des callbacks pour chaque topic
const topicCallbacks = {};

//fonction pour donnée l'état de la connexion
export const onConnect = (callback) => {
    client.on('connect', () => {
        console.log('MQTT Connecté au broker MQTT');
        callback(true); // la connexion est établie
    });

    client.on('close', () => {
        console.log('MQTT Déconnecté du broker MQTT');
        callback(false); //  la connexion est perdue
    });
};



client.on('message', (topic, message) => {
    console.log(`MQTT Message reçu sur ${topic}:`, message.toString());
    // Appeler les callbacks enregistrés pour ce topic
    if (topicCallbacks[topic]) {
        topicCallbacks[topic].forEach((callback) => callback(message.toString()));
    }
});

client.on('error', (err) => {
    console.error('Erreur de connexion au broker MQTT :', err);
});

// Fonction pour publier un message sur le topic
export const publishMessage = (topic,message) => {
    if (client.connected){
        client.publish(topic, message, (err) => {
            if (err) {
                console.error('Erreur de publication :', err);
            } else{
                console.log(`Message publié sur ${topic}:`, message);
            }
        });
    } else {
        console.error('Client MQTT non connecté');
    }
};

// Fonction pour écouter les messages
export const subscribeToTopic = (topic, callback) => {
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Erreur de souscription :', err);
        } else {
            console.log(`MQTT Souscrit au topic : ${topic}`);
        }
    });

    client.on('message', (receivedTopic, message) => {
        console.log(`Message reçu sur ${receivedTopic}:`, message.toString());
        if (receivedTopic === topic) {
            callback(message.toString());
        }
    });
};

// Fonction pour se déconnecter du broker MQTT
export const disconnectMqtt = () => {
    client.end(() => {
        console.log('Déconnecté du broker MQTT');
    });
};
export default client;