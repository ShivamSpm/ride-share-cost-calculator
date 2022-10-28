import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import RiderPage from "./pages/RiderPage"
import MoneyOwedPage from "./pages/MoneyOwedPage";
import SettingsPage from "./pages/SettingsPage";

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

export default function App(){

    
    // const user = sessionStorage.getItem('user');
    // console.log("document.cookie")
    const user1 = getCookie('user');
    
    return (
            <BrowserRouter>
                {user1 ? <Navbar/>: <></>}
                <Routes>
                    <Route path="/login" element={ !user1 ?  <LoginPage/>: <Navigate to="/rider" replace/>} />
                    <Route path="/signup" element={!user1 ? <SignupPage/>: <Navigate to="/rider" replace/>} />
                    <Route path="/" element={user1 ? <Navigate to="/rider" replace/>: <Navigate to="/login" replace/>}/>
                    <Route path="/rider" element={user1 ? <RiderPage/>: <Navigate to="/login" replace/>} />
                    <Route path="/owed" element={user1 ? <MoneyOwedPage/> : <Navigate to="/login" replace/>} />
                    <Route path="/settings" element={user1 ? <SettingsPage/> : <Navigate to="/login" replace/>} />
                </Routes>
            </BrowserRouter>
        
    );
}