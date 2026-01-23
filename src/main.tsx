// main.tsx
// Entry point for the React application
// Renders the App component into the DOM

import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Get the root element from index.html
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Create React root and render the app
const root = createRoot(rootElement);
root.render(<App />);
