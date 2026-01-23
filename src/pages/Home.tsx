// Home.tsx
// Main page containing About, Experience, and Education sections
// Scrollable content area on the right side of split layout

import { ExperienceTimeline, EducationTimeline } from "../components/Timeline.tsx";
import { experienceData, educationData } from "../data/timeline.ts";

export default function Home() {
  return (
    <main className="main-content">
      {/* About section */}
      <section id="about">
        <h2>About</h2>
        <p>
          I'm a software engineering leader motivated by impactful products and
          interested in distributed systems problems. I have a preference for
          backend and infrastructure work, but AI tooling has helped me find
          the frontend much more approachable!
        </p>
        <p style={{ marginTop: "1rem" }}>
          When I'm not tinkering or coding, you can find me in the gym,
          biking around the city, reading a novel (or non-fiction every once in a
          while), or exploring new places. My family and friends are spread far
          and wide, so while I'm based in New York, we may cross paths elsewhere.
        </p>
      </section>

      {/* Experience section */}
      <section id="experience">
        <h2>Experience</h2>
        <ExperienceTimeline entries={experienceData} />
      </section>

      {/* Education section */}
      <section id="education">
        <h2>Education</h2>
        <EducationTimeline entries={educationData} />
      </section>
    </main>
  );
}
