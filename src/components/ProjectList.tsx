// ProjectList.tsx
// Container component for project list, styled like timeline entries

import type { ProjectCategory } from "../data/projects.ts";

interface ProjectListProps {
  categories: ProjectCategory[];
}

export function ProjectList({ categories }: ProjectListProps) {
  // Flatten categories into a list of projects with their category
  const projects = categories.flatMap((cat) =>
    cat.projects.map((project) => ({ ...project, category: cat.category }))
  );

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <article key={index} className="project-entry">
          <h3 className="timeline-heading">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
            <span className="project-category"> · {project.category}</span>
          </h3>
          <p className="timeline-description">{project.description}</p>
          <p className="project-tech-byline">{project.technologies}</p>
        </article>
      ))}
    </div>
  );
}
