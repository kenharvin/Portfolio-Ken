import "./projects.css";

const projectsData = [
  {
    title: "MULTI-MODAL FARE AND ROUTE ESTIMATION SYSTEM",
    description:
      "An Android-based travel planning application developed using React Native and FastAPI. The system helps users estimate fares and identify suitable routes across multiple transportation modes, including public and private transport. It utilizes a hybrid of Greedy Algorithm and Fuzzy Logic for public transportation routing, while Greedy Algorithm is used to estimate private vehicle travel costs based on user preferences.",
    images: [
      "/projects/fare-system-1.png",
      "/projects/fare-system-2.png",
      "/projects/fare-system-3.png",
    ],
    link: "#",
    reverse: false,
  },
  {
    title: "PROGRESSTIFY",
    description:
      "A web-based project management application developed using React and Node.js. The system helps users organize tasks, manage projects, and improve productivity through an intuitive and responsive interface.",
    images: [
      "/projects/progresstify-1.png",
      "/projects/progresstify-2.png",
      "/projects/progresstify-3.png",
    ],
    link: "#",
    reverse: true,
  },
];

const Projects = () => {
  return (
    <>
      {projectsData.map((project, index) => (
        <section
          key={index}
          id={index === 0 ? "projects" : undefined}
          className={`project-section ${project.reverse ? "reverse" : ""}`}
        >
          <div className="project-blob project-blob-1"></div>
          <div className="project-blob project-blob-2"></div>

          <div className="project-content">
            <div className="project-image-col">
              <div className="project-image-stack">
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="project-image"
                  />
                ))}
              </div>
              
                <a
                  href={project.link}
                  className="project-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW PROJECT
              </a>
            </div>

            <div className="project-text-col">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Projects;