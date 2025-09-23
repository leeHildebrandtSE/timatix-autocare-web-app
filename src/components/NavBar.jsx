import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import Button from "./ui/Button";

export default function NavBar() {
  const loc = useLocation();
  const { theme, toggleTheme } = useTheme();

  const NavItem = ({ to, children }) => (
    <Link className={"nav-item " + (loc.pathname === to ? "active" : "")} to={to}>
      {children}
    </Link>
  );

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="logo" style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            <img src="images/logo_only.png" alt="Timatix AutoCare Logo" className="logo"></img>
          </div>
          <div className="brand-text" style={{ fontSize: '20px', fontWeight: '700', color: '#667eea' }}>
            Timatix
          </div>
        </div>

        <div className="nav-menu">
          <NavItem to="/">Vehicle</NavItem>
          <NavItem to="/book">Book</NavItem>
          <NavItem to="/jobs">Jobs</NavItem>
          <NavItem to="/users">Users</NavItem>
          <NavItem to="/history">History</NavItem>
        </div>

        <div className="nav-actions">
          <Button
            variant="ghost"
            id="themeToggle"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>
          <div className="profile-avatar">LH</div>
        </div>
      </div>
    </header>
  );
}