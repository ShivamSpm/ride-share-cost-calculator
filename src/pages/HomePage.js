import React from "react";
import { Nav, NavLink, NavMenu } 
    from "../components/NavbarElements";
import { useNavigate } from "react-router-dom";  

export default function HomePage(){
    const navigate = useNavigate();
    function logout(){
        navigate('/');
    }
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/rider-provider">
            Rider Provider
          </NavLink>
          <NavLink to="/passenger">
            Passenger
          </NavLink>
          <NavLink to="/settings">
            Settings
          </NavLink>
        </NavMenu>
        <button onClick={logout()}>Logout</button>
      </Nav>
    </>
  );
};