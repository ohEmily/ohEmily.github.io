// timeline.ts
// Data structure for work experience and education timelines

export interface TimelineEntry {
  location: string;
  dateRange: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
}

// Work experience timeline (most recent first)
export const experienceData: TimelineEntry[] = [
  {
    location: "New York, NY",
    dateRange: "Feb'25 - now",
    title: "Director of Engineering, Core Data Services Org",
    company: "Viam",
    description:
      "I lead backend-leaning teams building reliable data infrastructure for robotics and connected devices, from ingestion to long-term storage. I stay hands-on by writing code for cross-team projects that are hard to staff, unblocking migrations, and building internal tooling that boosts engineering productivity across the org.",
    skills: ["#orgDesign", "#techLeadership", "#staffPlus", "#dataInfra", "#multiCloud", "#golang", "#crossTeamImpact", "#oncallCulture"],
  },
  {
    location: "New York, NY",
    dateRange: "Jul'23 - Jan'25",
    title: "Lead Engineer, Core Services & Resilience",
    company: "Viam",
    description:
      "I grew Viam's first backend-focused feature and infrastructure team from 0 to 6 engineers and helped decompose a monolith into focused services with clear boundaries and build pipelines. I also led an authentication migration that unlocked new features while cutting auth costs by more than half.",
    skills: ["#serviceArchitecture", "#golang", "#grpc", "#mongodbAtlas", "#gcp", "#authMigration"],
  },
  {
    location: "New York, NY & remote",
    dateRange: "Jan'21 - Jun'23",
    title: "Team Lead, Insights & Telemetry, Cloud Platforms",
    company: "MongoDB",
    description:
      "I led a full‑stack team focused on observability, metrics, and service discovery for MongoDB's cloud platform, from roadmap planning to production incidents. I spent time both writing Java and Go code and mentoring engineers through pairing, reviews, and project shaping.",
    skills: ["#observability", "#roadmapping", "#teamLeadership", "#java", "#golang"],
  },
  {
    location: "New York, NY & remote",
    dateRange: "Jul'20 - Jan'21",
    title: "Senior Software Engineer, Backup, Cloud Platforms",
    company: "MongoDB",
    description:
      "I worked on cloud backup systems, leading multi‑week projects from design to rollout while handling customer‑facing production issues under time pressure. My day‑to‑day mixed Java and Go work with debugging distributed systems using AWS tooling and dashboards.",
    skills: ["#distributedSystems", "#backup", "#aws", "#incidentResponse"],
  },
  {
    location: "New York, NY & remote",
    dateRange: "Nov'17 - Jul'20",
    title: "Software Engineer, Backup, Cloud Platforms",
    company: "MongoDB",
    description:
      "I contributed to core backup services, from the Java job‑handling service to the Go client, and helped keep critical backups healthy for cloud customers. I collaborated with product and support to understand real‑world failure modes and feed them back into the design.",
    skills: ["#java", "#golang", "#cloudBackups", "#customerFocus"],
  },
  {
    location: "New York, NY",
    dateRange: "Jun'16 - Oct'17",
    title: "Software Engineer",
    company: "Segovia",
    description:
      "I wrote functional‑style Java against a PostgreSQL database to power payments in emerging markets and built internal tools and alerting for the engineering team. I also worked closely with colleagues and clients in West Africa to adapt the product to local constraints.",
    skills: ["#functionalJava", "#postgresql", "#developerTooling", "#remoteCollaboration"],
  },
];

// Education timeline (most recent first)
export const educationData: TimelineEntry[] = [
  {
    location: "New York, NY",
    dateRange: "2012 - 2016",
    title: "Bachelor of Arts (with honors), Computer Science",
    company: "Columbia University",
    description:
      "Andrew P. Kosoresow Memorial Award for Excellence in Teaching and Service (2016). Served as head teaching assistant or teaching assistant for Operating Systems (spring 2016), Advanced Programming (spring 2015 and 2016), and Fundamentals of Computer Systems (summer 2015)",
    skills: ["#algorithms", "#databases", "#operating-systems", "#networking"],
  },
];
