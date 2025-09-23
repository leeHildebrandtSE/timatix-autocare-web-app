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
          <img src="/images/logo_only.png" className="logo" alt="logo" />
          <img src="/images/title_only_cropped.png" className="logo_title" alt="title" />
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
