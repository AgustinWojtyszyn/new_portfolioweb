# AW — Experience Atelier / Design system

This file locks the visual direction of the public personal website.

## Purpose
Show prospective clients what Agustín Wojtyszyn can design and implement *on this website itself*. The portfolio is a live, interactive demonstration and an invitation to start a commercial conversation, **not a directory of private client software**.

## Core idea
**The page is the proof.** Visitors should be able to touch and change something meaningful before they are asked to trust claims about creative web development.

## Visual language
- Graphite near-black surfaces. No cream, mint, lime, light panels, aurora gradients, faux glass dashboards or glowing wallpaper.
- Restrained burnished-copper thread, used in controls, separators and artwork. Never neon.
- Typography is editorial: assertive heavy sans for structure, a true serif for significant long-form statements. No generic icon badge or fabricated monogram in the navigation.
- Small labels are sentence case, untracked. Large headlines carry the drama.
- Primary surfaces remain dark in every mode. No light theme is introduced without an explicit product requirement.
- The public logo is the name in text, not a card icon. The favicon is a quiet typographic initial.

## Homepage map
1. Hero: a clear commercial proposition alongside the actual live generative canvas.
2. Quiet statement about interacting with the work, not another logo wall.
3. Typography studio: real input, three art directions and scale.
4. Services: three editorial reading rows with working service-page links.
5. Working philosophy: identity, speed/accessibility and direct collaboration.
6. About: personal authorship and location, without clients' internal material.
7. Contact: real inquiry via prepared email + copy alternative, then footer.

## Engineering
- Next.js App Router, React, TypeScript, bilingual routes /es and /en.
- Main UI: src/sections/atelier-home.tsx.
- Canvas animation: src/components/creative-field.tsx. Native Canvas2D, no heavy WebGL dependencies.
- Typographic compositor: src/components/type-playground.tsx, rendered with HTML/CSS.
- Header: src/components/navigation.tsx; palette/layout: src/app/atelier.css.
- Font families: current local Manrope variable with Georgia serif accent (fallbacks declared); no runtime remote font fetch.
- Never introduce client project names, private URLs, screenshots, fabricated testimonials or metrics on the public homepage.
- Archived case routes are unlinked, noindexed and excluded from the sitemap; legacy CSS is isolated to those routes.
- Preserve structured data, canonical links, bilingual alternates, service URLs and the analytics consent boundary.
- No page should require Canvas support to expose its useful text and links.
- Stop canvas loops when out of view or tab hidden; cap pixel ratio; provide a pause button and prefers-reduced-motion static mode.
- Buttons, links, modal, input and range must be usable by keyboard and have strong focus-visible styles.
- Every responsive change is checked at 320, 390, 768, 1024, 1440 and 1920px. No horizontal scroll, illegible text or hidden mobile action.

## Source and inspiration
Design principles studied from Nutlope/hallmark v2.0.0 (anti-generic visual floor and redesign guidance) and the interaction/craft approaches visible in the public codebases Giats2498/giats-portfolio and ArsalanKaleem/portfolio. The site's artwork, interactions and CSS are original; reference project code and assets are not copied.

## Quality gate
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:e2e

Do not call a change complete until CI succeeds on the final commit.
