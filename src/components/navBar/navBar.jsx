import { useState, useEffect } from "react";
import "./navBar.css";

const NavBar = () => {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // section counts as "active" once 50% visible
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="navbar">
      <img src="/projects/logo.png" alt="Logo" className="navbar-logo" />

      <ul className="navbar-links">
        <li className={activeSection === "home" ? "active" : ""}>
          <a href="#home">HOME</a>
        </li>
        <li className="divider">|</li>
        <li className={activeSection === "projects" ? "active" : ""}>
          <a href="#projects">PROJECTS</a>
        </li>
        <li className="divider">|</li>
        <li className={activeSection === "contacts" ? "active" : ""}>
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