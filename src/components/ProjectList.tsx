// ProjectList.tsx
// Container component for project list, styled like timeline entries

import type { ProjectCategory } from "../data/projects.ts";

interface ProjectListProps {
  categories: ProjectCategory[];
}

function getGitHubConfig(project: Record<string, unknown> & { title: string }) {
  if ("githubLink" in project) {
    throw new Error(
      `[projects] "${project.title}" uses deprecated githubLink. Use github: { url, isPrivate } instead.`
    );
  }

  if (!("github" in project) || project.github == null) {
    return null;
  }

  if (typeof project.github !== "object") {
    throw new Error(
      `[projects] "${project.title}" has invalid github config. Expected github: { url, isPrivate }.`
    );
  }

  const github = project.github as Record<string, unknown>;
  if (typeof github.url !== "string" || typeof github.isPrivate !== "boolean") {
    throw new Error(
      `[projects] "${project.title}" is missing required github fields. Expected github: { url: string, isPrivate: boolean }.`
    );
  }

  return { url: github.url, isPrivate: github.isPrivate };
}

export function ProjectList({ categories }: ProjectListProps) {
  // Flatten categories into a list of projects with their category
  const projects = categories.flatMap((cat) =>
    cat.projects.map((project) => ({ ...project, category: cat.category }))
  );

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        (() => {
          const github = getGitHubConfig(project as Record<string, unknown> & { title: string });

          return (
            <article key={index} className="project-entry">
              <h3 className="timeline-heading">
                <span className="project-heading-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </span>
                <span className="project-category"> · {project.category}</span>
                {github && !github.isPrivate && (
                  <span className="project-category-meta">
                    <span className="project-meta-separator">{" · "}</span>
                    <a
                      href={github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      className="project-github-link"
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.23.49-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.82 1.23.82.72 1.22 1.88.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.32-1.58.82-2.14-.08-.2-.36-1.02.08-2.11 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.09.16 1.91.08 2.11.52.56.82 1.27.82 2.14 0 3.07-1.88 3.74-3.67 3.94.3.25.55.73.55 1.48v2.2c0 .22.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                      </svg>
                      <span className="visually-hidden">GitHub</span>
                    </a>
                  </span>
                )}
                {github && github.isPrivate && (
                  <span className="project-category-meta">
                    <span className="project-meta-separator">{" · "}</span>
                    <span
                      className="project-github-private"
                      aria-label="Repository is private"
                      title="Repository is private"
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8a8.01 8.01 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.23.49-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.8.06 1.23.82 1.23.82.72 1.22 1.88.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.32-1.58.82-2.14-.08-.2-.36-1.02.08-2.11 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.09.16 1.91.08 2.11.52.56.82 1.27.82 2.14 0 3.07-1.88 3.74-3.67 3.94.3.25.55.73.55 1.48v2.2c0 .22.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                      </svg>
                      <span className="project-github-private-tag">Private source</span>
                      <span className="visually-hidden">GitHub</span>
                    </span>
                  </span>
                )}
              </h3>
              <p className="timeline-description">{project.description}</p>
              <p className="project-tech-byline">{project.technologies}</p>
            </article>
          );
        })()
      ))}
    </div>
  );
}
