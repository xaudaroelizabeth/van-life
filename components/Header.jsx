import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("loggedin");
  const navigate = useNavigate();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    textUnderlineOffset: "10px",
    color: "#ff8c38",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    navigate("/");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <NavLink
          to="/"
          className="mobile-only"
          onClick={closeMenu}
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>

        <NavLink
          to="/vans"
          onClick={closeMenu}
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </NavLink>

        <NavLink
          to="/about"
          onClick={closeMenu}
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>

        <NavLink
          to="/host"
          onClick={closeMenu}
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Host
        </NavLink>

        <Link to="login" className="login-link" onClick={closeMenu}>
          <img src={imageUrl} className="login-icon" alt="Login" />
        </Link>

        {isLoggedIn ? (
          <button
            className="logout-btn mobile-login-link"
            onClick={() => {
              fakeLogOut();
              closeMenu();
            }}
          >
            Log Out
          </button>
        ) : (
          <Link to="login" className="mobile-login-link" onClick={closeMenu}>
            Log In
          </Link>
        )}
      </nav>
    </header>
  );
}
