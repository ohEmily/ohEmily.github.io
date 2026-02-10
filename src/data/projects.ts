// projects.ts 
// Data structure for projects grouped by category

export interface ProjectEntry {
  title: string;
  link: string;
  description: string;
  technologies: string;
}

export interface ProjectCategory {
  category: string;
  projects: ProjectEntry[];
}

export const projectCategories: ProjectCategory[] = [
  {
    category: "Full Stack Web App",
    projects: [
      {
        title: "Should I Walk?",
        link: "https://shouldiwalk.emilypakulski.com",
        description: "Web app built to easily look up Citi Bike station capacity. Built after I biked to Bedford Av subway but couldn't dock my bike one too many times. Supports toggling between exact address and subway station names for your location and destination.",
        technologies: "React SPA with a Django backend, Airflow for data ingestion, and Postgres database. Deployed on Oracle Cloud Infrastructure to use their generous free tier.",
      },
    ],
  },
];
