const { verifyToken } = require('@clerk/clerk-sdk-node');

const socketAuth = async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;

        if(!token) {
            return next( new Error('No auth token found'));
        }

        const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
        socket.data.userId = payload.sub;
        
        console.log('Socket userId:', payload.sub);

        next();
    } catch (error) {
        next(new Error('Socket auth error:', error));
    }
}

module.exports = { socketAuth };