const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = []; // Lista de usuarios conectados

// Ruta básica
app.get('/', (req, res) => {
    res.send('Servidor de chat funcionando');
});

// Conexión de Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    // Registrar el usuario
    socket.on('register', (username) => {
        users.push({ username, socketId: socket.id });
        console.log(`${username} se ha registrado.`);
    });

    // Enviar mensaje a otro usuario
    socket.on('sendMessage', (data) => {
        const { to, message } = data;
        const user = users.find(user => user.username === to);
        if (user) {
            io.to(user.socketId).emit('receiveMessage', message);
        }
    });

    // Desconexión
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
        users = users.filter(user => user.socketId !== socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
});
