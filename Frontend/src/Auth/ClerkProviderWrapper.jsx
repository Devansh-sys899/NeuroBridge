import React from "react";
import { ClerkProvider } from '@clerk/clerk-react'

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const ClerkProviderWrapper = ({ children }) => {
    return (
        <ClerkProvider publishableKey={clerkKey} navigate={(to) => window.history.pushState({}, '', to)}>
            {children}
        </ClerkProvider>
    )
}



