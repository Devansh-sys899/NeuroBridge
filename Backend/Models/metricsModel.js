const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({ 
    userId: {
        type: String
    },
    totalSessions: {
        type: Number
    },
    avgCognitiveLoad: {
        type: Number
    },
    avgFocus: {
        type: Number
    },
    avgDuration: {
        type: Number
    },
    knowledgeDecayIndex: {
        type: Number
    }
}, { timestamps: true });

module.exports = new mongoose.model('Metrics', metricsSchema);