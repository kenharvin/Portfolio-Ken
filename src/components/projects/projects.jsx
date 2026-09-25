import { useState, useEffect, useCallback } from "react";
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
    gallery: [
      "/projects/fare-system-1.png",
      "/projects/fare-system-2.png",
      "/projects/fare-system-3.png",
      "/projects/fare-system-4.png",
      "/projects/fare-system-5.png",
      "/projects/fare-system-6.png",
      "/projects/fare-system-7.png",
    ],
    reverse: false,
  },
  {
    title: "PROGRESSTIFY",
    description:
      "A web-based project management application developed using React and Node.js. The system helps users organize tasks, manage projects, and improve productivity through an intuitive and responsive interface.",
    images: [
      "/projects/progresstify-preview-1.png",
      "/projects/progresstify-preview-2.png",
      "/projects/progresstify-preview-3.png",
    ],
    gallery: [
      "/projects/progresstify-1.png",
      "/projects/progresstify-2.png",
      "/projects/progresstify-3.png",
      "/projects/progresstify-4.png",
    ],
    reverse: true,
  },
];

const Projects = () => {
  const [lightbox, setLightbox] = useState(null); // { images: [], index: 0 } | null

  const openLightbox = (images) => {
    setLightbox({ images, index: 0 });
  };

  const closeLightbox = () => setLightbox(null);

  const nextImage = useCallback(() => {
    setLightbox((prev) =>
      prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
    );
  }, []);

  const prevImage = useCallback(() => {
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            index: (prev.index - 1 + prev.images.length) % prev.images.length,
          }
        : null
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, nextImage, prevImage]);

  // Prevent background scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightbox]);

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
              <button
                className="project-btn"
                onClick={() => openLightbox(project.gallery)}
              >
                VIEW PROJECT
              </button>
            </div>

            <div className="project-text-col">
              <h2 className="project-title">{project.title}</h2>
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        </section>
      ))}

      {lightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.images[lightbox.index]}
              alt={`Slide ${lightbox.index + 1}`}
              className="lightbox-image"
            />
            <div className="lightbox-counter">
              {lightbox.index + 1} / {lightbox.images.length}
            </div>
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default Projects;