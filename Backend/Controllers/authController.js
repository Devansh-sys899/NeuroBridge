const express = require('express');

const getMe = (req,res) => {
    const user = req.auth?.user;
    return res.status(200).json({
        success: true,
        message: 'Clerk is working',
        userId: user.id,
        sessionId: user.session.id
    });
}

module.exports = { getMe }; 