import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Projects({ items }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    const elements = document.querySelectorAll('.project');
    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, [items]);

  return (
    <section id="projects">
      <h2>Projects</h2>
      {items.map((project) => (
        <article className="project" key={project.id}>
          <h3>{project.title}</h3>
          <div className="image-gallery">
            {project.images.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} width="100%" />
            ))}
          </div>
          <p>{project.summary}</p>
          <p>
            <strong>Tech Used:</strong> {project.tech.join(', ')}
          </p>
          <a className="cursor-target" href={project.github} target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </article>
      ))}
    </section>
  );
}

Projects.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      tech: PropTypes.arrayOf(PropTypes.string).isRequired,
      github: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

export default Projects;

