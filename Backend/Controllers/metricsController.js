const express = require('express');
const Metrics = require('../Models/metricsModel');

const getMetrics = async (req,res) => {
    try {
        const userId = req.auth.userId;
        const metrics = await Metrics.findOne(userId);
        
        if(!metrics) {
            return res.status(404).json({
                success: false,
                message: 'Metrics not found'
            })
        };
    
        return res.status(200).json({
            success: true,
            metrics: metrics
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: error.message 
        })
    }
}

module.exports = { getMetrics };