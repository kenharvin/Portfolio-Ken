import { useState, useEffect } from "react";
import "./scrollDots.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "contacts", label: "Contacts" },
];

const ScrollDots = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scroll-dots">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`scroll-dot ${
            activeSection === section.id ? "active" : ""
          }`}
          onClick={() => scrollToSection(section.id)}
          aria-label={`Go to ${section.label}`}
        >
          <span className="scroll-dot-tooltip">{section.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ScrollDots;