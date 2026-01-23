// App.tsx
// Main application component with React Router
// Sets up routes and wraps pages in the split-screen layout

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import Home from "./pages/Home.tsx";
import Resume from "./pages/Resume.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Left sidebar - always visible */}
        <Sidebar />

        {/* Right content area - routes determine what displays */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
