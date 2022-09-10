import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";

export default function LoginPage() {
    return (
        <>
          <Header
            heading="Login to your account"
            paragraph="Create an account "
            linkName="Signup"
            linkUrl="/signup"
            />  
           <Login/>
        </>
    )
}