// TimelineEntry.tsx
// Timeline entry components for employer and education entries

import type { EmployerEntry, EducationEntry } from "../data/timeline.ts";

interface EmployerEntryProps {
  entry: EmployerEntry;
}

export function EmployerTimelineEntry({ entry }: EmployerEntryProps) {
  return (
    <article className="timeline-entry">
      {/* Company header */}
      <div className="timeline-meta">
        <span className="timeline-location">{entry.company}</span>
        {" · "}
        <span className="timeline-dates">{entry.location}</span>
      </div>

      {/* Roles at this company */}
      <div className="timeline-roles">
        {entry.roles.map((role, index) => (
          <div key={index} className="timeline-role">
            <h3 className="timeline-heading">
              {role.title}
              <span className="timeline-role-dates"> · {role.dateRange}</span>
            </h3>
            <p className="timeline-description">{role.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

interface EducationEntryProps {
  entry: EducationEntry;
}

export function EducationTimelineEntry({ entry }: EducationEntryProps) {
  return (
    <article className="timeline-entry">
      {/* Institution header */}
      <div className="timeline-meta">
        <span className="timeline-location">{entry.institution}</span>
        {" · "}
        <span className="timeline-dates">{entry.location}</span>
      </div>

      {/* Degrees at this institution */}
      <div className="timeline-roles">
        {entry.degrees.map((degree, index) => (
          <div key={index} className="timeline-role">
            <h3 className="timeline-heading">
              {degree.title}
              <span className="timeline-role-dates"> · {degree.dateRange}</span>
            </h3>
            <p className="timeline-description">{degree.description}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
