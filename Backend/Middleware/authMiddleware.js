const { verifyToken } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

const clerkAuthMiddleware = async (req,res,next) => {
    try {

        console.log("request method:", req.method);
        if(req.method === "OPTIONS") {
            return next();
        }

        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(404).json({
                success: false,
                message: 'No Auth headers found'
            });
        }

        
        const token = authHeader.split(" ")[1];
        const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
        console.log('UserId:', payload.sub);
        
        req.auth = { userId: payload.sub };

        next();
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                success: false,
                message: 'Invalid Token'
            })
    }
}

module.exports = { clerkAuthMiddleware };