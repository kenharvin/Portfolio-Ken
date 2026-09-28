import "./home.css";

const Home = () => {
  return (
    <section className="hero" id="home">

      <div className="hero-content">
        <div className="hero-card">
          <span className="hero-status">
            <span className="hero-status-dot"></span>
            OPEN TO OPPORTUNITIES
          </span>

          <span className="hero-label">PERSONAL PORTFOLIO</span>

          <h1 className="hero-name">
            Ken Harvin
            <br />
            <span className="hero-name-accent">Lacanienta</span>
          </h1>

          <p className="hero-subtitle">
            A BACHELOR OF SCIENCE IN
            <br />
            COMPUTER SCIENCE GRADUATE
          </p>

          <div className="hero-actions">
            <a href="#contacts" className="hero-btn hero-btn-outline">
              CONTACT ME
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="hero-image-glow"></div>
          <img src={"/projects/profile.png"} alt="Ken Harvin Lacanienta" />
        </div>
      </div>

      <p className="hero-scroll-cue" aria-label="Scroll down">
        <span>SCROLL</span>
        <span className="hero-scroll-arrow">↓</span>
      </p>
    </section>
  );
};

export default Home;