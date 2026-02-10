// ProjectList.tsx
// Container component for project list, styled like timeline entries

import type { ProjectCategory } from "../data/projects.ts";

interface ProjectListProps {
  categories: ProjectCategory[];
}

export function ProjectList({ categories }: ProjectListProps) {
  return (
    <div className="timeline">
      {categories.map((category, catIndex) => (
        <article key={catIndex} className="timeline-entry">
          {/* Category header */}
          <div className="timeline-meta">
            <span className="timeline-location">{category.category}</span>
          </div>

          {/* Projects in this category */}
          <div className="timeline-roles">
            {category.projects.map((project, projIndex) => (
              <div key={projIndex} className="timeline-role">
                <h3 className="timeline-heading">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <p className="project-tech-byline">{project.technologies}</p>
                <p className="timeline-description">{project.description}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
