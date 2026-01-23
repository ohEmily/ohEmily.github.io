// Timeline.tsx
// Container component for timeline entries
// Maps through data and renders TimelineEntry components

import TimelineEntry from "./TimelineEntry.tsx";
import type { TimelineEntry as TimelineEntryType } from "../data/timeline.ts";

interface TimelineProps {
  entries: TimelineEntryType[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="timeline">
      {entries.map((entry, index) => (
        <TimelineEntry key={index} entry={entry} />
      ))}
    </div>
  );
}
