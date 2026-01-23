// Resume.tsx
// Page that attempts to embed Google Doc via iframe
// Shows fallback link if iframe fails to load

import { useState } from "react";

// Your Google Drive resume link - using preview URL for iframe embedding
const RESUME_URL =
  "https://drive.google.com/file/d/0B9pvvLQIYkLcdFQyY3MwSmd3cm8/preview?usp=sharing&resourcekey=0-OR7VYCgnUtbLOlSJ3AN3wA";

export default function Resume() {
  const [iframeError, setIframeError] = useState(false);

  // Handle iframe load errors
  const handleIframeError = () => {
    setIframeError(true);
  };

  return (
    <div className="resume-container">
      {!iframeError ? (
        <iframe
          className="resume-iframe"
          src={RESUME_URL}
          title="Emily's Resume"
          onError={handleIframeError}
        />
      ) : (
        <div className="resume-fallback">
          <h2>Resume</h2>
          <p>
            Unable to display resume in iframe. Click below to view in a new
            tab.
          </p>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      )}
    </div>
  );
}
