import React from "react";
import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage() {
    return (
        <>
          <Header
            heading="Register your account"
            paragraph="Go to "
            linkName="Login"
            linkUrl="/login"
            />    
            <Signup/>
        </>
    )
}