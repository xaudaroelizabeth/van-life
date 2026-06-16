import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    function syncAuth() {
      setIsLoggedIn(localStorage.getItem("loggedin") === "true");
    }

    syncAuth();

    window.addEventListener("storage", syncAuth);
    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    textUnderlineOffset: "10px",
    color: "#ff8c38",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    setIsLoggedIn(false);
    navigate("/login");
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

        {isLoggedIn ? (
          <>
            {/* DESKTOP */}
            <button
              className="login-link logout-btn desktop-only"
              onClick={fakeLogOut}
            >
              <a className="desktop-text">Log Out</a>
            </button>

            {/* MOBILE */}
            <button
              className="logout-btn mobile-login-link"
              onClick={() => {
                fakeLogOut();
                closeMenu();
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            {/* DESKTOP: icon + text */}
            <Link
              to="/login"
              className="login-link desktop-only "
              onClick={closeMenu}
            >
              Log In
            </Link>

            {/* MOBILE */}
            <Link to="/login" className="mobile-login-link" onClick={closeMenu}>
              Log In
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
