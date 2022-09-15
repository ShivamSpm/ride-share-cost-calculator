import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from "./pages/HomePage";

export default function App(){
    const user = sessionStorage.getItem('user');

    console.log("user");
    console.log(user);
    if(user){
        console.log("Inside user");
    }
    return (
        <div>
            <BrowserRouter>
                <Routes> 
                    <Route path="/home" element={user ? <HomePage/> : <Navigate to="/login" replace/>} />
                    <Route path="/login" element={ !user ? <LoginPage/> : <Navigate to="/home" replace/>} />
                    <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to="/home" replace/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}