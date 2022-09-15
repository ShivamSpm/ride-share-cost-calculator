import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from "./components/NavBar";
import RiderPage from "./pages/RiderPage"
import PassengerPage from "./pages/PassengerPage";
import SettingsPage from "./pages/SettingsPage";

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
                {user ? <Navbar/>: <></>}
                <Routes> 
                    {/* <Route exact path="/home" element={user ? <></> : <Navigate to="/login" replace/>} /> */}
                    <Route path="/rider" element={user ? <RiderPage/>: <Navigate to="/login" replace/>} />
                    <Route path="/passenger" element={user ? <PassengerPage/> : <Navigate to="/login" replace/>} />
                    <Route path="/settings" element={user ? <SettingsPage/> : <Navigate to="/login" replace/>} />
                    <Route path="/login" element={ !user ? <LoginPage/> : <Navigate to="/home" replace/>} />
                    <Route path="/signup" element={!user ? <SignupPage/> : <Navigate to="/home" replace/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}