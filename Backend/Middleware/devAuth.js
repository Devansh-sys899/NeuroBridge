const express = require('express');

const devAuth = (req,res,next) => {
    req.auth = { 
        userId: 'test-user-123'
    };    
    console.log(req.auth.userId);
    next();
}

module.exports = { devAuth };