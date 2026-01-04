import { SignIn } from "@clerk/clerk-react";

export const SignInPage = () => {
    return (
        <SignIn routing="path" path="/sign-in" />
    )
}
