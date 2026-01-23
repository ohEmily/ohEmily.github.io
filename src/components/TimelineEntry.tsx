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
      {/* Location and date range */}
      <div className="timeline-meta">
        <span className="timeline-location">{entry.location}</span>
        {" · "}
        <span className="timeline-dates">{entry.dateRange}</span>
      </div>

      {/* Degree and institution */}
      <h3 className="timeline-heading">
        {entry.title} · {entry.institution}
      </h3>

      {/* Description */}
      <p className="timeline-description">{entry.description}</p>
    </article>
  );
}
