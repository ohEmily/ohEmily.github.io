// projects.ts 
// Data structure for projects grouped by category

export interface ProjectEntry {
  title: string;
  link: string;
  github?: {
    url: string;
    isPrivate: boolean;
  };
  description: string;
  technologies: string;
}

export interface ProjectCategory {
  category: string;
  projects: ProjectEntry[];
}

function validateProjectCategories(categories: ProjectCategory[]): ProjectCategory[] {
  for (const category of categories) {
    for (const project of category.projects) {
      const rawProject = project as Record<string, unknown>;
      if ("githubLink" in rawProject) {
        throw new Error(
          `[projects] "${project.title}" uses deprecated githubLink. Use github: { url, isPrivate } instead.`
        );
      }

      if (project.github && typeof project.github.isPrivate !== "boolean") {
        throw new Error(
          `[projects] "${project.title}" is missing required github.isPrivate boolean.`
        );
      }
    }
  }

  return categories;
}

export const projectCategories: ProjectCategory[] = validateProjectCategories([
  {
    category: "Full Stack Web App",
    projects: [
      {
        title: "Should I Walk?",
        link: "https://shouldiwalk.emilypakulski.com",
        github: {
          url: "https://github.com/ohEmily/shouldiwalk",
          isPrivate: true,
        },
        description: "Web app built to easily look up Citi Bike station capacity. Built after I biked to Bedford Av subway but couldn't dock my bike one too many times. Supports toggling between exact address and subway station names for your location and destination.",
        technologies: "React SPA with a Django backend, Airflow for data ingestion, and Postgres database. Deployed on Oracle Cloud Infrastructure to use their generous free tier.",
      },
    ],
  },
]);
