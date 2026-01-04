const { Server } = require('socket.io');
let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: true,
            credentials: true
        },
    });

    io.on("connection", (socket) => {
        console.log('Socket connected: ', socket.id);
    });

    io.engine.on('connection_error', (error) => {
        console.log('Socket engine error:', error.message);
    })

    return io;
}

function getIO() {
    if(!io) { 
        throw new Error("Socket.io could not be intialized");
    }

    return io;
}

module.exports = { initSocket, getIO };