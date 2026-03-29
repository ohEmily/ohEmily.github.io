// Resume.tsx
// Page that attempts to embed Google Doc via iframe
// Shows fallback link if iframe fails to load

import { useState } from "react";

// Google Drive resume: preview URL for iframe, view URL for fallback link
const RESUME_FILE_ID = "0B9pvvLQIYkLcdFQyY3MwSmd3cm8";
const RESUME_RESOURCE_KEY = "0-OR7VYCgnUtbLOlSJ3AN3wA";
const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview?usp=sharing&resourcekey=${RESUME_RESOURCE_KEY}`;
const RESUME_VIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/view?usp=sharing&resourcekey=${RESUME_RESOURCE_KEY}`;

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
          src={RESUME_PREVIEW_URL}
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
          <a href={RESUME_VIEW_URL} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      )}
    </div>
  );
}
