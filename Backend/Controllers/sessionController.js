const express = require('express');
const Session = require('../Models/sessionModel');
const { startSession, endSession } = require('../Services/sessionService');

const startSessionController = async (req, res) => { 
    const { topic, difficulty, intent } = req.body;
    const userId = req.auth?.userId; 

    if (!userId || !topic || !difficulty || !intent) {
        return res.status(400).json({ success: false, message: 'Missing required session start data (userId, topic, difficulty, or intent).' });
    }

    try {
        const response = await startSession(userId, topic, difficulty, intent);

        if (response.error) {
            return res.status(409).json({ 
                success: false,
                message: response.error
            });
        }
    
        return res.status(201).json({ 
            success: true,
            message: 'Session has been created',
            sessionId: response.sessionId,
        });
    } catch (error) {
        console.error("Controller Error (startSession):", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during session start.',
        });
    }
}

const endSessionController = async (req, res) => { 
    const { id } = req.params;
    const sessionId = id;
    const { selfReportedFocus } = req.body;
    const userId = req.auth?.userId;

    console.log('Session Id :', sessionId);
    console.log('Payload:', req.body);
    if (!sessionId || !selfReportedFocus) {
        return res.status(400).json({ success: false, message: 'Missing required session end data (userId, sessionId, or selfReportedFocus).' });
    }

    try {
        const response = await endSession(userId, sessionId, selfReportedFocus);

        if(response.error) {
            return res.status(404).json({
                success: false,
                message: 'No active session found'
            })
        }
    
        if(response.success === true) {
            return res.status(200).json({ 
                success: true,
                message: 'Session has been completed and metrics calculated.',
                session: response.session,
            });
        }
    } catch (error) {
        console.error("Controller Error (endSession):", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during session completion.',
        });
    }
}

const getSessionById = async (req,res) => {
    const { id } = req.params;
    const session = await Session.findById(id);

    if(!session) {
        return res.status(404).json({
            success: false,
            message: 'Session not found'
        })
    }

    console.log("Session:", session);

    return res.status(200).json({
        success: true,
        session
    });
} 

module.exports = { startSessionController, endSessionController, getSessionById };