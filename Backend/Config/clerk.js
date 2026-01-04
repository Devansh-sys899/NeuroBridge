const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const requireAuth = ClerkExpressRequireAuth({ 
    authorizedParties: ['http://localhost:5173'],
});

module.exports = requireAuth;