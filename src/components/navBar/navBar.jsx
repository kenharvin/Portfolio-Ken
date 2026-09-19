import { useState, useEffect } from "react";
import "./navBar.css";

const NavBar = () => {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">LOGO</div>

      <ul className="navbar-links">
        <li className="active">
          <a href="#home">HOME</a>
        </li>
        <li className="divider">|</li>
        <li>
          <a href="#projects">PROJECTS</a>
        </li>
        <li className="divider">|</li>
        <li>
          <a href="#contacts">CONTACTS</a>
        </li>
      </ul>

      <button
        className="theme-toggle"
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle dark mode"
      >
        {isDark ? "🌙" : "☀️"}
      </button>
    </nav>
  );
};

export default NavBar;