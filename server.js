const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);

    // Enviar historial de mensajes al conectar
    ws.send(JSON.stringify({ type: 'history', messages: getMessages() }));

    ws.on('message', (message) => {
        // Enviar mensaje a todos los clientes
        const msgData = JSON.parse(message);
        if (msgData.type === 'message') {
            // Guardar mensaje en la historia
            saveMessage(msgData.message, msgData.sender);
        }

        // Reenviar a todos los clientes
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter((client) => client !== ws);
    });
});

// Simulación de base de datos
let messageHistory = [];

function saveMessage(message, sender) {
    const newMessage = { id: Date.now(), message, sender, deleted: false };
    messageHistory.push(newMessage);
}

function getMessages() {
    return messageHistory.filter(msg => !msg.deleted); // Filtrar los mensajes borrados
}

console.log('Servidor WebSocket en puerto 8080');
