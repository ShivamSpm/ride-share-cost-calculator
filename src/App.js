import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from "./pages/HomePage";

function App(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route path="/home" element={<HomePage/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;