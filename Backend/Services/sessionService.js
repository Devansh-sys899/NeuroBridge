const Session = require('../Models/sessionModel');
const { computeMetrics } = require('../Services/metricService');

/**
 * Starts a new learning session for a user.
 * Throws an error if an 'Active' session already exists.
 */
const startSession = async (userId, topic, difficulty, intent) => {
    try {
        const existing = await Session.findOne({ userId, status: 'Active' });
        if (existing) {
            // Returning an error object for consistency with endSession.
            return {
                error: 'Session already active. End the existing session before starting a new one.',
            };
        }

        const newSession = await Session.create({
            userId,
            topic,
            difficulty: Number(difficulty), // Ensure difficulty is a number if it can be a string
            intent,
            status: 'Active',
            startTime: Date.now()
        });

        // Return the ID of the newly created session upon success.
        return {
            success: true,
            sessionId: newSession._id,
        };
    } catch (error) {
        console.error("Error starting session:", error); // Use console.error for errors
        return {
            error: error.message,
        };
    }
}

/**
 * Ends an active session, calculates metrics, and updates the session document.
 */
const endSession = async (userId, sessionId, selfReportedFocus) => {
    try {
        const session = await Session.findOne({ _id: sessionId, userId, status: 'Active' });
        
        if (!session) {
            throw new Error('No active session found for this user and ID.');
        }

        session.endTime = Date.now();
        session.status = 'Completed';

        // 1. Correctly destructure durationMinutes (already correct in the previous file)
        const { durationMinutes } = calculateDurationMinutes(session.startTime, session.endTime);
        
        // 2. FIX: Destructure cognitiveLoad. It was previously an object, causing the CastError.
        const { cognitiveLoad } = calculateCognitiveLoad(durationMinutes, session.difficulty, selfReportedFocus);
        
        // 3. Destructure knowledgeDecayScore. This relies on cognitiveLoad being a number now.
        const { knowledgeDecayScore } = calculateKnowledgeDecay(session.intent, cognitiveLoad);
        
        // 4. Destructure revisionIntervalDays. This relies on knowledgeDecayScore being a number now.
        const { revisionIntervalDays } = calculateRevisionInterval(session.intent, knowledgeDecayScore);

        // Assign numerical values to the Mongoose document fields
        session.duration = durationMinutes;
        session.cognitiveLoad = cognitiveLoad;
        session.selfReportedFocus = selfReportedFocus; 
        session.knowledgeRetentionScore = knowledgeDecayScore; 
        
        // Calculate the timestamp for the suggested revision time
        session.revisionSuggestedAt = revisionIntervalDays; 

        await session.save();

        await computeMetrics(userId);

        return {
            success: true,
            session: {
                id: session._id,
                cognitiveLoad: cognitiveLoad,
                durationMinutes: durationMinutes,
                knowledgeDecayScore: knowledgeDecayScore,
                revisionIntervalDays: revisionIntervalDays
            }
        }
    } catch (error) {
        console.error("Error ending session:", error);
        // If it's a validation error, return the specific message
        if (error.name === 'ValidationError') {
            return {
                error: `Validation Error: ${error.message}`
            }
        }
        return {
            error: error.message,
        }
    }
}

/**
 * Calculates the session duration in minutes.
 */
const calculateDurationMinutes = (startTime, endTime) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    
    const ms = end - start;
    
    const durationMinutes = Math.max(1, Math.round(ms / (1000 * 60))); 
    
    return { durationMinutes };
}

/**
 * Calculates cognitive load based on duration, difficulty, and focus.
 */
const calculateCognitiveLoad = (duration, difficulty, focus) => {
    // Ensure inputs are numbers
    const numDuration = Number(duration);
    const numDifficulty = Number(difficulty);
    const numFocus = Math.min(5, Math.max(1, Number(focus))); // Clamp focus to 1-5 range

    const baseLoad = numDuration * numDifficulty;
    // Lower focus (e.g., 1) results in a higher focusModifier (e.g., (6-1)/5 = 1).
    // Higher focus (e.g., 5) results in a lower focusModifier (e.g., (6-5)/5 = 0.2).
    const focusModifier = (6 - numFocus) / 5; 
    const cognitiveLoad = Math.round(baseLoad * focusModifier * 100) / 100; // Round to 2 decimal places

    return { cognitiveLoad };
}

/**
 * Calculates a score for predicted knowledge decay (higher score = more decay).
 */
const calculateKnowledgeDecay = (intent, cognitiveLoad) => {
    const baseDecay = intent === 'Learning' ? 0.6 : intent === 'Research' ? 0.8 : 1.0; 
    
    const loadMultiplier = 1 + Math.min(cognitiveLoad / 100, 1); 
    
    const knowledgeDecayScore = Math.round(baseDecay * loadMultiplier * 10) / 10; // Round to 1 decimal place

    return { knowledgeDecayScore };
}

/**
 * Calculates the suggested revision interval in days.
 */
const calculateRevisionInterval = (intent, decayRate) => {
    const baseInterval = intent === 'Learning' ? 1 : intent === 'Research' ? 5 : 7;
    
    const decayDivisor = Math.max(0.1, decayRate); 
    
    const revisionIntervalDays = Math.max(1, Math.round(baseInterval / decayDivisor));
    
    return { revisionIntervalDays };
}

module.exports = { startSession, endSession };