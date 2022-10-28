import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import Cookies from 'js-cookie';

export default function Navbar(){
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        sessionStorage.removeItem('user');
        // Cookies.remove('user', { path: '/login' });
        document.cookie = "user= ;"
        window.location.reload(false);
    }
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/rider" >
            Rider Provider
          </NavLink>
          <NavLink to="/owed" >
            Owe/Owed
          </NavLink>
          <NavLink to="/settings" >
            Settings
          </NavLink>
        </NavMenu>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </Nav>
    </>
  );
};