ROLE: Senior Migration Engineer ensuring all features are migrated accurately

OBJECTIVE:
We are done coding for the migraiton of an existing, fully working JavaScript + CSS frontend application from /Users/sriramrajendran/7_projects/7h-beaconoftech to this modern repo /Users/sriramrajendran/7_projects/7h-beaconoftech-cursor using:
- Astro (framework + routing)
- React (component logic)
- Tailwind CSS (styling)
Now, we have to get this migrated app to work exactly as the original app.

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
9. Ensure the repo does not introduce any css or js files, everything should be in React and Tailwindcss

ABSOLUTE RULE:
❌ No creative rewrites
❌ No assumptions
❌ No TODO comments
❌ No placeholders
❌ No partial migrations
❌ No css left in the repo, everything shd be Tailwindcss
❌ No js files left in the repo, everything shd be in React

## FINAL OUTPUT REQUIREMENTS

Deliverables:
- Fully migrated Astro + React + Tailwind app
- Clean, readable code
- Identical behavior and layout
- No console errors
- No missing features

## Styles
On every time this is prompted, ensure to check for styles, features in /spec/base_app folder and ensure they are migrated to the new app accurately in Tailwindcss and React components.

HEader, Footer, Sidemenu, etc., are all not loading and working fine in web and mobile. These are not working now.

## FINAL CHECK:
If any behavior differs from the original app → FIX IT.

Always take a nuclear approach - ensure everything works exactly as before.

Also spin up the app, check console log and ensure there are no errors, iterate until it works.