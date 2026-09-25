import "./home.css";

const Home = () => {
  return (
    <section className="hero" id="home">

      <div className="hero-content">
        <div className="hero-card">
          <span className="hero-label">PERSONAL PORTFOLIO</span>
          <h1 className="hero-name">
            Ken Harvin
            <br />
            Lacanienta
          </h1>
          <p className="hero-subtitle">
            A BACHELOR OF SCIENCE IN
            <br />
            COMPUTER SCIENCE GRADUATE
          </p>
          <button className="hero-btn">LEARN MORE</button>
        </div>

        <div className="hero-image">
          <img src="/projects/profile.png" alt="Ken Harvin Lacanienta" />
        </div>
      </div>
    </section>
  );
};

export default Home;