// Home.tsx
// Main page containing About, Experience, and Education sections
// Scrollable content area on the right side of split layout

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ExperienceTimeline, EducationTimeline } from "../components/Timeline.tsx";
import { ProjectList } from "../components/ProjectList.tsx";
import { experienceData, educationData } from "../data/timeline.tsx";
import { projectCategories } from "../data/projects.ts";

export default function Home() {
  const location = useLocation();

  // Handle scrolling to hash anchors when navigating from other pages
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.slice(1); // Remove the '#'
      const element = document.getElementById(elementId);
      if (element) {
        // Small delay to ensure DOM is ready after navigation
        setTimeout(() => {
          // Center the section to avoid overshooting (e.g. Education landing on Projects).
          // block: "center" ensures the target is in the middle of the viewport.
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="main-content">
      {/* About section */}
      <section id="about">
        <h2>About</h2>
        <p>
          I consider myself a distributed systems-leaning backend software engineer
          by trade, but I try to think hard about the product and to work across
          the stack. I have a preference for backend and infrastructure work, but
          these days, AI tooling gives me the help I need with the occasional
          frontend task.
        </p>
        <p>
          As a leader, I’m deeply motivated by the feeling of a team gelling. I
          feel at home in an organization where I see folks helping each other,
          extending psychological safety, and giving each other the benefit of the
          doubt.
        </p>
        <p>
          I enjoy tinkering with technology outside of work. You might also
          find me in the gym, biking around the city, reading a novel (or
          non-fiction every once in a while), or exploring new places. My
          family and friends are spread far and wide, so while I'm based in
          New York, we may cross paths elsewhere.
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

      {/* Projects section */}
      <section id="projects">
        <h2>Projects</h2>
        <ProjectList categories={projectCategories} />
      </section>
    </main>
  );
}
