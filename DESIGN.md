# Visual system — AW / The unforgettable

A Hallmark v2.0–guided, fully bespoke personal portfolio for Agustín Wojtyszyn.
The website itself is the demonstration. There are no client logos, screenshots, faux metrics, play tools, speculative results or test games in the public experience.

## Art direction
- Audience: prospective freelance web clients, agencies and founders.
- Job: move visitors from a strong first impression to an email inquiry.
- Visual language: near-black theatrical canvas, sculptural polished metal, restrained oxblood, off-white typography. Dark surfaces only.
- Hero: cinematic title and original abstract chrome sculpture; text, purpose and CTA visible at desktop fold.
- Choreography: very slow material drift, one structural scroll movement, hero entrance; no controls, no input-dependent experience, no autoplay audio.
- Chapters: editorial statement / identity material plate / sculptural motion / engineering discipline / service rows / personal authored introduction / hiring finale.
- Copy: bilingual and concrete. No fabricated data, client brands or unverified accolades.
- Keep original links to bilingual service pages, privacy policy, actual GitHub/LinkedIn and mailto.
- Fonts: self-hosted package Manrope Variable for text; Georgia as the statement face. Do not fetch remote font assets.
- Accessibility: still readable without JavaScript; reduced-motion disables kinetic effects; visible focus; semantic headings.
- Performance: no WebGL, canvas RAF, GSAP, Lenis, video downloads or inflated dependencies for a visual that can be accomplished with native CSS/SVG.

## Sources examined
Hallmark v2.0: https://github.com/Nutlope/hallmark
Jesper Landberg (2026): https://jesperlandberg.com
Gionatan Nese (2026): https://www.gionatannese.com
Meer Mohsin (2026): https://meermohsin.me
Aristide Benoist: https://aristidebenoist.com
Open-source references: https://github.com/darkroomengineering/lenis and https://github.com/sanjjuo/2026-Portfolio
We studied principles, not copied client assets, layouts or code.

## Code
- Main experience: src/sections/cinema-home.tsx
- Original sculptural SVG and decorative motion: src/components/cinema-art.tsx
- Main design tokens and mobile-first styles: src/app/cinema.css
- Navigation and language switching: src/components/navigation.tsx
- Historical case routes are unlinked and noindexed; they remain for content preservation, not promoted publicly.

## Checks
npm run lint
npm run typecheck
npm run build
npm run test:e2e
All must pass on the published main commit. Do not rely on test success as proof of visual taste: inspect mobile and desktop screenshots as well.
