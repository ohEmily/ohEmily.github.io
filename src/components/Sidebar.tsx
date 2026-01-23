// Sidebar.tsx
// Left sidebar containing intro, photo, navigation, and social links
// Sticky on desktop, stacks at top on mobile

import { Link } from "react-router-dom";
import TypingAnimation from "./TypingAnimation.tsx";
import PhotoSampler from "./PhotoSampler.tsx";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1 }}>
        {/* Typing animation header */}
        <header className="sidebar-header">
          <h1>
            <TypingAnimation />
          </h1>
        </header>

        {/* Photo and nav side-by-side */}
        <div className="photo-nav-container">
          {/* Interactive photo sampler */}
          <PhotoSampler />

          {/* Navigation links to sections */}
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#education">Education</a>
              </li>
              <li>
                <Link to="/resume">Resume</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Social links at bottom */}
      <div className="social-links">
        <a
          href="https://www.linkedin.com/in/emilypakulski"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          [LI]
        </a>
        <a
          href="https://github.com/ohEmily"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          [GH]
        </a>
      </div>
    </aside>
  );
}
