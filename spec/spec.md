ROLE: Senior Frontend Migration Engineer

OBJECTIVE:
Migrate an existing, fully working JavaScript + CSS frontend application from /Users/sriramrajendran/7_projects/7h-beaconoftech-astro_working
to a modern stack using:
- Astro (framework + routing)
- React (component logic)
- Tailwind CSS (styling)
- earlier migration was attempted, but not all ReactJS, Tailwindcss was done, a few have been brought in, still the repo has css and js files in it

CRITICAL CONSTRAINTS:
1. Functionality must remain 100% IDENTICAL - some features are listed in /spec_mobile_UI.md
2. Visual layout must remain pixel-equivalent
3. Navigation behavior must be unchanged on:
   - Desktop browsers
   - Mobile browsers (touch + responsive behavior)
4. API requests, payloads, headers, auth, and response handling MUST NOT CHANGE
5. Do NOT introduce new features, refactors, or UX changes
6. Do NOT remove or rename existing functionality
7. Do NOT simplify logic unless explicitly unavoidable
8. Output must be production-ready and runnable

ABSOLUTE RULE:
❌ No creative rewrites
❌ No assumptions
❌ No TODO comments
❌ No placeholders
❌ No partial migrations
❌ No css left in the repo, everything shd be Tailwindcss
❌ No js files left in the repo, everything shd be in React

---

## STEP 1: BASELINE ANALYSIS (READ-ONLY)

Before writing any code:
- Analyze the existing folder structure
- Identify:
  - Entry points
  - Navigation logic
  - Side menu behavior
  - Mobile-specific logic
  - API modules
  - State management patterns (even if implicit)
- Create a precise mental mapping of the current behavior

DO NOT modify logic during this step.

---

## STEP 2: TARGET ARCHITECTURE (STRICT)

Use this structure:

/src
  /layouts
    BaseLayout.astro
  /pages
    *.astro            ← Page-level routing
  /components
    /navigation
    /menus
    /ui
  /services
    api.js             ← Direct port of existing API logic
  /styles
    tailwind.css
  /utils
  /assets

Rules:
- Each existing HTML “page” maps to one Astro page
- Each logical UI block maps to one React component
- Shared layout → Astro layout
- No routing libraries unless required (Astro routing only)

---

## STEP 3: NAVIGATION & MENU MIGRATION (ZERO DEVIATION)

Navigation requirements:
- Preserve:
  - Click behavior
  - Active state logic
  - Mobile toggle behavior
  - Keyboard and touch handling
- Side menu:
  - Same open/close logic
  - Same animations (or visually identical equivalents)
  - Same breakpoints

Rules:
- Convert nav/menu JS into React components
- State must behave identically
- No CSS-based “simplification” allowed

---

## STEP 4: API & DATA LAYER (BIT-FOR-BIT)

- Move all API calls into `/services/api.js`
- Preserve:
  - Endpoints
  - HTTP methods
  - Headers
  - Auth handling
  - Error handling
- Do NOT:
  - Change response parsing
  - Add abstractions
  - Introduce new libraries

React components must call APIs exactly as before.

---

## STEP 5: STYLING CONVERSION (CSS → TAILWIND)

Styling rules:
- Convert existing CSS rules into Tailwind utility classes
- Preserve:
  - Spacing
  - Typography
  - Colors
  - Breakpoints
  - Hover/focus/active states
- If a style cannot be reasonably expressed in Tailwind:
  - Use Tailwind @apply
  - OR scoped CSS inside Astro

DO NOT:
- Change visual hierarchy
- “Improve” spacing
- Adjust fonts or colors

---

## STEP 6: STATE & EVENT HANDLING

- Port all JS event listeners to React handlers
- Preserve:
  - Event order
  - Side effects
  - Timing behavior
- No debounce/throttle changes
- No state consolidation

---

## STEP 7: MOBILE PARITY GUARANTEE

Explicitly validate:
- Touch interactions
- Menu toggles
- Scroll locking (if present)
- Viewport resizing behavior

Mobile behavior must match existing app exactly.

---

## STEP 8: FINAL OUTPUT REQUIREMENTS

Deliverables:
- Fully migrated Astro + React + Tailwind app
- Clean, readable code
- Identical behavior and layout
- No console errors
- No missing features

FINAL CHECK:
If any behavior differs from the original app → FIX IT.