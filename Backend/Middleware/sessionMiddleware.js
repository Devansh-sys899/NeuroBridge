const express = require('express');
const Session = require('../Models/sessionModel');

const validateSessionOwner = async (req,res,next) => {
    const { sessionId } = req.params;
    const userId = req.auth?.userId;
    const session = await Session.findOne(sessionId);
    
    if(!session) {
        return res.status(400).json({
            success: false,
            message: 'Unable to find session'
        })
    }

    if(session.userId.toString() !== sessionId) {
        return res.status(403).json({
            success: false,
            message: 'Access forbidden'
        })
    }

    req.session = session;
    next();
}

module.exports = { validateSessionOwner };

