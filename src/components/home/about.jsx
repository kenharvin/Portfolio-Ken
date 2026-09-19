import "./about.css";

const techStack = [
  "JAVASCRIPT",
  "REACT",
  "HTML",
  "CSS",
  "NODE.JS",
  "PHP",
  "PYTHON",
  "REACT NATIVE",
];

const About = () => {
  return (
    <section className="about" id="home">
      <div className="about-content">
        <span className="about-label">ABOUT / WHAT I DO</span>
        <h2 className="about-title">Building Ideas Into Applications</h2>
        <p className="about-text">
          I'm a Computer Science graduate passionate about building modern
          web applications and solving real-world problems through
          technology.
        </p>

        <h3 className="about-subheading">Technologies I Work With</h3>

        <div className="tech-pills">
          {techStack.map((tech) => (
            <span key={tech} className="tech-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;