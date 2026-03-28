// timeline.tsx
// Data structure for work experience and education timelines

import type { ReactNode } from "react";

export interface Role {
  dateRange: string;
  title: string;
  description: ReactNode;
}

export interface EmployerEntry {
  company: string;
  location: string;
  roles: Role[];
}

export interface Degree {
  dateRange: string;
  title: string;
  description: ReactNode;
}

export interface EducationEntry {
  institution: string;
  location: string;
  degrees: Degree[];
}

// Work experience grouped by employer (most recent first)
export const experienceData: EmployerEntry[] = [
  {
    company: "Treeswift",
    location: "New York, NY",
    roles: [
      {
        dateRange: "Feb'26 - now",
        title: "Head of Software Engineering",
        description: (
          <>
            I lead software engineering at Treeswift, a 28-person Series A
            startup applying physical AI to vegetation management, with
            applications to forest fire prevention. Our 9-person software team
            spans web, data pipeline, and machine learning, with a stack that
            includes (among other things) an Airflow 3 pipeline on Astronomer
            crunching through massive data uploads on a Kubernetes cluster with
            specialized worker nodes, alongside a React web app with a Python
            API.
            <p>
              <strong>
                We're actively <a
                  href="https://jobs.ashbyhq.com/treeswift"
                  target="_blank"
                  rel="noreferrer"
                >
                  hiring
                </a>
                !
              </strong>
            </p>
          </>
        ),
      },
    ],
  },
  {
    company: "Viam",
    location: "New York, NY",
    roles: [
      {
        dateRange: "Feb'25 - Feb'26",
        title: "Director of Engineering, Core Data Services Org",
        description:
          "I led backend-leaning teams building reliable data infrastructure for robotics and connected devices, from ingestion to long-term storage. I stayed hands-on by writing code for cross-team projects that were hard to staff, unblocking migrations, and building internal tooling that boosted engineering productivity across the org.",
      },
      {
        dateRange: "Jul'23 - Jan'25",
        title: "Lead Engineer, Core Services & Resilience",
        description:
          "I grew Viam's first backend-focused feature and infrastructure team from 0 to 6 engineers and helped decompose a monolith into focused services with clear boundaries and build pipelines. I also led an authentication migration that unlocked new features while cutting auth costs by more than half.",
      },
    ],
  },
  {
    company: "MongoDB",
    location: "New York, NY & remote",
    roles: [
      {
        dateRange: "Jan'21 - Jun'23",
        title: "Team Lead, Insights & Telemetry, Cloud Platforms",
        description:
          "I led a full‑stack team focused on observability, metrics, and service discovery for MongoDB's cloud platform, from roadmap planning to production incidents. I spent time both writing Java and Go code and mentoring engineers through pairing, reviews, and project shaping.",
      },
      {
        dateRange: "Jul'20 - Jan'21",
        title: "Senior Software Engineer, Backup, Cloud Platforms",
        description:
          "I worked on cloud backup systems, leading multi‑week projects from design to rollout while handling customer‑facing production issues under time pressure. My day‑to‑day mixed Java and Go work with debugging distributed systems using AWS tooling and dashboards.",
      },
      {
        dateRange: "Nov'17 - Jul'20",
        title: "Software Engineer, Backup, Cloud Platforms",
        description:
          "I contributed to core backup services, from the Java job‑handling service to the Go client, and helped keep critical backups healthy for cloud customers. I collaborated with product and support to understand real‑world failure modes and feed them back into the design.",
      },
    ],
  },
  {
    company: "Segovia",
    location: "New York, NY",
    roles: [
      {
        dateRange: "Jun'16 - Oct'17",
        title: "Software Engineer",
        description:
          "I wrote functional‑style Java against a PostgreSQL database to power payments in emerging markets and built internal tools and alerting for the engineering team. I also worked closely with colleagues and clients in West Africa to adapt the product to local constraints.",
      },
    ],
  },
];

// Education timeline (most recent first)
export const educationData: EducationEntry[] = [
  {
    institution: "Columbia University",
    location: "New York, NY",
    degrees: [
      {
        dateRange: "2012 - 2016",
        title: "Bachelor of Arts (with honors), Computer Science",
        description: <>
          <p>Andrew P. Kosoresow Memorial Award for Excellence in Teaching and Service (2016).</p>
          <p>Served as head teaching assistant or teaching assistant for Operating Systems (spring 2016), Advanced Programming (spring 2015 and 2016), and Fundamentals of Computer Systems (summer 2015).</p>
        </>,
      },
    ],
  },
];
