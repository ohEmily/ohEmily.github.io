// Sidebar.tsx
// Left sidebar containing intro, photo, navigation, and social links
// Sticky on desktop, stacks at top on mobile

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TypingAnimation from "./TypingAnimation.tsx";
import PhotoSampler from "./PhotoSampler.tsx";

const sectionIds = ["about", "experience", "education", "projects"];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("about");
  const [showQr, setShowQr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only run on home page
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      // On desktop (≥1280px), .main-content has overflow-y: auto and is the scroll container.
      // On mobile, the whole page scrolls via window, so we must use window values instead.
      const scrollContainer = document.querySelector(".main-content");
      const isContainerScrollable =
        scrollContainer != null &&
        getComputedStyle(scrollContainer).overflowY === "auto";

      const scrollTop = isContainerScrollable ? scrollContainer.scrollTop : window.scrollY;
      const scrollHeight = isContainerScrollable ? scrollContainer.scrollHeight : document.body.scrollHeight;
      const clientHeight = isContainerScrollable ? scrollContainer.clientHeight : window.innerHeight;
      // Use a fixed offset from the top as the activation point, matching scrollIntoView(block: "start").
      // Using viewport center caused tall sections (Experience) to scroll to their middle instead of top.
      // Using a small fixed offset keeps short sections (Education) from overshooting into the next section.
      const activationPoint = scrollTop + 100;

      // Check if scrolled to bottom - highlight last section
      // Only apply this if user has actually scrolled (scrollTop > 0)
      // to prevent education from being highlighted on initial mobile load
      if (scrollTop > 0 && scrollTop + clientHeight >= scrollHeight - 50) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          // Get position relative to the scroll container
          const rect = element.getBoundingClientRect();
          const containerRect = isContainerScrollable ? scrollContainer.getBoundingClientRect() : null;
          const containerTop = containerRect?.top ?? 0;
          const relativeTop = rect.top - containerTop + scrollTop;
          
          if (activationPoint >= relativeTop && activationPoint < relativeTop + element.offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Get the scroll container
    const scrollContainer = document.querySelector(".main-content");
    
    // Initial check after a brief delay to ensure DOM is ready
    setTimeout(handleScroll, 100);

    // Listen to both the container and window (for mobile)
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

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
          <PhotoSampler showQr={showQr} />

          {/* Navigation links to sections */}
          <nav aria-label="Main navigation">
            <ul>
              <li>
                <Link 
                  to="/#about" 
                  className={activeSection === "about" ? "nav-active" : ""}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/#experience"
                  className={activeSection === "experience" ? "nav-active" : ""}
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link 
                  to="/#education"
                  className={activeSection === "education" ? "nav-active" : ""}
                >
                  Education
                </Link>
              </li>
              <li>
                <Link 
                  to="/#projects"
                  className={activeSection === "projects" ? "nav-active" : ""}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  to="/resume"
                  className={location.pathname === "/resume" ? "nav-active" : ""}
                >
                  Resume
                </Link>
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
          className="social-link"
        >
          [LI]
        </a>
        <a
          href="https://github.com/ohEmily"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="social-link"
        >
          [GH]
        </a>
        <button
          type="button"
          className={`social-link ${showQr ? "social-active" : ""}`}
          onClick={() => setShowQr((prev) => !prev)}
          aria-label="Toggle QR code"
          aria-pressed={showQr}
        >
          [QR]
        </button>
      </div>
    </aside>
  );
}
