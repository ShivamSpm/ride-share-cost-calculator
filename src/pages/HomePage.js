import React from "react";
import { Nav, NavLink, NavMenu } 
    from "../components/NavbarElements";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";

export default function HomePage(){
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        sessionStorage.removeItem('user');
        window.location.reload(false);
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
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </Nav>
    </>
  );
};