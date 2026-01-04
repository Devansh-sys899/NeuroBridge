const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    topic: {
        type: String,
        trim: true
    },
    intent: {
        type: String,
        enumerate: ['Research', 'Learning', 'Revise'],
    },
    difficulty: {
        type: Number,
    },
    startTime: {
        type: Date,
        default: Date.now()
    },
    endTime: {
        type: Date,
    },
    duration: {
        type: Number,
    },
    selfReportedFocus: {
        type: Number,
    },
    cognitiveLoad: {
        type: Number,
    },
    knowledgeRetentionScore: {
        type: Number,
    },
    revisionSuggestedAt: {
        type: Number,
    },
    status: {
        type: String,
        default: 'Pending'
    },
    lastHeartbeat: {
        type: Date,
        default: Date.now(),
    },
    interruptions: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = new mongoose.model('Session', sessionSchema);