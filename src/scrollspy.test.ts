import { describe, it, expect } from "vitest";
import { getActiveSection, ACTIVATION_RATIO, SectionLayout, ScrollState } from "./scrollspy.ts";

// Simulates a page with four sections stacked vertically.
// Total content height: 3000px, viewport height: 800px.
const sectionIds = ["about", "experience", "education", "projects"];

const layouts: SectionLayout[] = [
  { id: "about", top: 0, height: 300 },
  { id: "experience", top: 300, height: 900 },
  { id: "education", top: 1200, height: 800 },
  { id: "projects", top: 2000, height: 1000 },
];

const DESKTOP_HEIGHT = 800;
const DESKTOP_SCROLL = 3000;

const MOBILE_HEIGHT = 667;  // iPhone SE viewport
const MOBILE_SCROLL = 3000;

function scroll(scrollTop: number, clientHeight = DESKTOP_HEIGHT, scrollHeight = DESKTOP_SCROLL): ScrollState {
  return { scrollTop, scrollHeight, clientHeight };
}

/** Return the minimum scrollTop (> 0) needed for the activation point to reach `target`. */
function scrollTopFor(target: number, clientHeight = DESKTOP_HEIGHT): number {
  return target - clientHeight * ACTIVATION_RATIO + 1;
}

function mobileScroll(scrollTop: number): ScrollState {
  return scroll(scrollTop, MOBILE_HEIGHT, MOBILE_SCROLL);
}

describe("getActiveSection", () => {
  // ---- Bug fix: About is selected at the top of the page ----

  it("highlights 'about' when viewport is at the very top (scrollTop = 0)", () => {
    // This is the bug that was reported: the About section is small (300px)
    // and the activation point would land in Experience without the fix.
    expect(getActiveSection(sectionIds, layouts, scroll(0))).toBe("about");
  });

  // ---- Scrolling through each section ----

  it("highlights 'experience' when scrolled into the experience section", () => {
    const st = scrollTopFor(600); // well inside experience (300–1200)
    expect(getActiveSection(sectionIds, layouts, scroll(st))).toBe("experience");
  });

  it("highlights 'education' when scrolled into the education section", () => {
    const st = scrollTopFor(1400); // well inside education (1200–2000)
    expect(getActiveSection(sectionIds, layouts, scroll(st))).toBe("education");
  });

  it("highlights 'projects' when scrolled into the projects section", () => {
    const st = scrollTopFor(2200); // well inside projects (2000–3000)
    expect(getActiveSection(sectionIds, layouts, scroll(st))).toBe("projects");
  });

  // ---- Edge cases ----

  it("highlights last section when scrolled to the very bottom", () => {
    // scrollTop + clientHeight >= scrollHeight - 50
    expect(getActiveSection(sectionIds, layouts, scroll(DESKTOP_SCROLL - DESKTOP_HEIGHT))).toBe("projects");
  });

  it("highlights last section at exact bottom", () => {
    expect(getActiveSection(sectionIds, layouts, scroll(DESKTOP_SCROLL))).toBe("projects");
  });

  it("returns null for empty section list", () => {
    expect(getActiveSection([], [], scroll(0))).toBeNull();
  });

  it("returns null when activation point doesn't fall in any section (gap)", () => {
    // Layouts with a gap between 300–500
    const gapped: SectionLayout[] = [
      { id: "about", top: 0, height: 300 },
      { id: "experience", top: 500, height: 500 },
    ];
    // Place activation point in the gap (300–500)
    const st = scrollTopFor(400); // 400 is inside the gap
    expect(getActiveSection(["about", "experience"], gapped, scroll(st, DESKTOP_HEIGHT, 1000))).toBeNull();
  });

  // ---- Section boundary transitions ----

  it("transitions from about to experience at the right scroll position", () => {
    // experience starts at 300; smallest scrollTop > 0 puts activation past about
    expect(getActiveSection(sectionIds, layouts, scroll(1))).toBe("experience");
  });

  it("transitions from experience to education", () => {
    // activation point needs to reach 1200
    const st = scrollTopFor(1200);
    expect(getActiveSection(sectionIds, layouts, scroll(st))).toBe("education");
  });

  it("transitions from education to projects", () => {
    // activation point needs to reach 2000
    const st = scrollTopFor(2000);
    expect(getActiveSection(sectionIds, layouts, scroll(st))).toBe("projects");
  });
});

describe("getActiveSection — mobile viewport", () => {
  it("highlights 'about' at the top of the page", () => {
    expect(getActiveSection(sectionIds, layouts, mobileScroll(0))).toBe("about");
  });

  it("highlights 'experience' when scrolled into experience", () => {
    const st = scrollTopFor(600, MOBILE_HEIGHT);
    expect(getActiveSection(sectionIds, layouts, mobileScroll(st))).toBe("experience");
  });

  it("highlights 'education' when scrolled into education", () => {
    const st = scrollTopFor(1400, MOBILE_HEIGHT);
    expect(getActiveSection(sectionIds, layouts, mobileScroll(st))).toBe("education");
  });

  it("highlights 'projects' when scrolled into projects", () => {
    const st = scrollTopFor(2200, MOBILE_HEIGHT);
    expect(getActiveSection(sectionIds, layouts, mobileScroll(st))).toBe("projects");
  });

  it("highlights last section when scrolled to the very bottom", () => {
    expect(getActiveSection(sectionIds, layouts, mobileScroll(MOBILE_SCROLL - MOBILE_HEIGHT))).toBe("projects");
  });

  it("transitions from about to experience", () => {
    expect(getActiveSection(sectionIds, layouts, mobileScroll(1))).toBe("experience");
  });

  it("transitions from experience to education", () => {
    const st = scrollTopFor(1200, MOBILE_HEIGHT);
    expect(getActiveSection(sectionIds, layouts, mobileScroll(st))).toBe("education");
  });

  it("transitions from education to projects", () => {
    const st = scrollTopFor(2000, MOBILE_HEIGHT);
    expect(getActiveSection(sectionIds, layouts, mobileScroll(st))).toBe("projects");
  });
});
