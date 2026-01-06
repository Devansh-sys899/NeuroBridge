const Session = require('../Models/sessionModel');
const { socketAuth } = require('./socket.auth');


const setupSocket = (io) => {
    io.use(socketAuth);

    io.on("connection", (socket) => {
        socket.on("JOIN_SESSION", ({ sessionId }) => {
            socket.join(sessionId);
            console.log(`Socket ${socket.id} has joined session ${sessionId}`);
        })
        socket.on("SESSION_HEARTBEAT", async ({ sessionId }) => {
            
            const heartbeatInterval = 30_000;
            const interruptionThreshold = heartbeatInterval * 2;

            const session = await Session.findById(sessionId);

            if(!session) {
                return { error: 'No session found'};
            }    

            const now = Date.now();
            const last =  session.lastHeartbeat ? session.lastHeartbeat.getTime() : now; 

            if(now - last > interruptionThreshold) {
                session.interruptions += 1;
                console.log('Interruption is registered');
            }

            session.lastHeartbeat = Date.now();

            await session.save();
            console.log('Session Heartbeat is received');
        })

        socket.on("SESSION_RESYNC", async ({ sessionId }) => {
            const userId = socket.data.userId;
            const session = await Session.findOne({ userId,
                status: { $in: ['Active', 'Inactive'] }
            });

            console.log('UserId:', socket.data.userId);

            console.log('Session:', session);
            if(!session) return;

            socket.join(session._id);

            socket.data.sessionId = session._id;
            session.status = 'Active';
            session.lastHeartbeat = Date.now();

            await session.save();

            socket.emit('SESSION_RESYNCED', session);
            console.log('Session Resynced:', session._id);
        }) 
        socket.on('disconnect', async() => {
            const sessionId = socket.data.sessionId;
            if(!sessionId) return;

            const session = await Session.findById(sessionId);
            if(!session || session === 'completed') return;

            session.status = 'Inactive';
            await session.save();

            console.log(`Session ${sessionId} is marked as Inactive`);
        })
    })
}

module.exports = { setupSocket };