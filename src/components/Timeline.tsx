// Timeline.tsx
// Container components for experience and education timelines

import { EmployerTimelineEntry, EducationTimelineEntry } from "./TimelineEntry.tsx";
import type { EmployerEntry, EducationEntry } from "../data/timeline.ts";

interface ExperienceTimelineProps {
  entries: EmployerEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  return (
    <div className="timeline">
      {entries.map((entry, index) => (
        <EmployerTimelineEntry key={index} entry={entry} />
      ))}
    </div>
  );
}

interface EducationTimelineProps {
  entries: EducationEntry[];
}

export function EducationTimeline({ entries }: EducationTimelineProps) {
  return (
    <div className="timeline">
      {entries.map((entry, index) => (
        <EducationTimelineEntry key={index} entry={entry} />
      ))}
    </div>
  );
}
