// scrollspy.ts
// Pure logic for determining the active section based on scroll position.
// Extracted from Sidebar.tsx so it can be unit-tested without React or DOM.

export interface SectionLayout {
  id: string;
  top: number;    // offset from the top of the scrollable area
  height: number;
}

export interface ScrollState {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

const BOTTOM_THRESHOLD = 50;

// Activation point as a fraction of viewport height (0 = top, 1 = bottom).
export const ACTIVATION_RATIO = 0.5;

/**
 * Given the current scroll position and the layout of each section,
 * return the id of the section that should be highlighted.
 */
export function getActiveSection(
  sectionIds: string[],
  layouts: SectionLayout[],
  scroll: ScrollState,
): string | null {
  if (sectionIds.length === 0) return null;

  // At the very top, always highlight the first section.
  if (scroll.scrollTop <= 0) {
    return sectionIds[0];
  }

  const atBottom = scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - BOTTOM_THRESHOLD;

  // At the bottom and the last section is visible, highlight it.
  // The last section may be shorter than the viewport, so the activation
  // point (viewport center) can land in the previous section even though
  // the user has scrolled as far as possible.
  if (atBottom) {
    return sectionIds[sectionIds.length - 1];
  }

  // Activation point as a proportion of the viewport height.
  const activationPoint = scroll.scrollTop + scroll.clientHeight * ACTIVATION_RATIO;

  for (const layout of layouts) {
    if (activationPoint >= layout.top && activationPoint < layout.top + layout.height) {
      return layout.id;
    }
  }

  return null;
}
