const Session = require('../Models/sessionModel');
const Metrics = require('../Models/metricsModel');

/**
 * Aggregates metrics from a list of completed sessions.
 * Assumes session documents have: cognitiveLoad, selfReportedFocus, 
 * durationMinutes, and knowledgeDecayScore.
 */
function aggregateSessions(sessions) {
    const total = sessions.length;

    if (total === 0) {
        return {
            totalSession: 0,
            avgCognitiveLoad: 0,
            avgFocus: 0,
            avgDuration: 0,
            knowledgeDecayIndex: 0,
        };
    }

    const sum = sessions.reduce(
        (acc, s) => {
            // FIX 1: Use correct property names from the Session model
            acc.cognitive += s.cognitiveLoad || 0;
            acc.focus += s.selfReportedFocus || 0;
            // FIX 2: Corrected typo from 'durtion' to 'duration' and used 'durationMinutes'
            acc.duration += s.durationMinutes || 0; 
            // FIX 3: Corrected decay field name from 'knowledgeRetentionScore' to 'knowledgeDecayScore'
            acc.decay += s.knowledgeDecayScore || 0; 
            return acc;
        }, {
            cognitive: 0,
            focus: 0,
            duration: 0, // Corrected initialization typo here as well
            decay: 0
        }
    );

    return { 
        totalSessions: total,
        avgCognitiveLoad: Math.round(sum.cognitive / total),
        avgFocus: Math.round(sum.focus / total),
        avgDuration: Math.round(sum.duration / total),
        knowledgeDecayIndex: Math.round(sum.decay / total),
    };
};

/**
 * Calculates aggregated metrics for a user and updates or creates their Metrics document.
 */
async function computeMetrics(userId) {
    if (!userId) {
        console.error("computeMetrics called without a userId.");
        return;
    }
    
    try {
        // Find all completed sessions for the user
        const sessions = await Session.find({
            userId,
            status: 'Completed'
        }).lean(); // Use .lean() for faster read-only queries

        if (sessions.length === 0) {
            console.log(`No completed sessions found for user ${userId}. Skipping metrics update.`);
            return;
        }

        const { 
            totalSessions, 
            avgCognitiveLoad, 
            avgDuration, 
            avgFocus, 
            knowledgeDecayIndex
        } = aggregateSessions(sessions);

        // Find and update the existing metrics document, or create a new one if none exists.
        await Metrics.findOneAndUpdate(
            { userId }, // Query
            { // Update fields
                totalSessions,
                avgCognitiveLoad,
                avgDuration,
                avgFocus,
                knowledgeDecayIndex,
                lastUpdated: Date.now()
            },
            { 
                upsert: true, // Create the document if it doesn't exist
                new: true // Return the updated document
            }
        );

        console.log(`Metrics successfully updated for user ${userId}.`);

    } catch (error) {
        console.error(`Error computing metrics for user ${userId}:`, error);
        // Depending on requirements, you might want to rethrow or return an error response here.
        // For background tasks, just logging the error is often sufficient.
    }
}

module.exports = { computeMetrics };