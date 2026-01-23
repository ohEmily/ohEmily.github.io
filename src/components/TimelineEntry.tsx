// TimelineEntry.tsx
// Individual timeline entry component
// Displays location, dates, title, description, and skill tags
// Styled after Marina Aísa's timeline design

import type { TimelineEntry as TimelineEntryType } from "../data/timeline.ts";

interface TimelineEntryProps {
  entry: TimelineEntryType;
}

export default function TimelineEntry({ entry }: TimelineEntryProps) {
  return (
    <article className="timeline-entry">
      {/* Location and date range */}
      <div className="timeline-meta">
        <span className="timeline-location">{entry.location}</span>
        {" · "}
        <span className="timeline-dates">{entry.dateRange}</span>
      </div>

      {/* Role title and company */}
      <h3 className="timeline-heading">
        {entry.title} · {entry.company}
      </h3>

      {/* Description */}
      <p className="timeline-description">{entry.description}</p>

      {/* Skills learned */}
      <div className="timeline-skills">
        <span className="timeline-skills-label">Skill tags:</span>
        {entry.skills.map((skill, index) => (
          <span key={index} className="timeline-tag">
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}
