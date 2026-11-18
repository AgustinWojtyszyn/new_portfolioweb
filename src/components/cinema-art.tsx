import type { CSSProperties } from 'react';

/**
 * Original material study.
 * A deliberately non-interactive work of art: no games, forms or client data.
 * SVG renders before JavaScript and all motion is opt-out with reduced motion.
 */
export function ChromeSculpture({ variant = 'hero' }: { variant?: 'hero' | 'detail' }) {
 return <div className={'vx-sculpture vx-sculpture--' + variant} aria-hidden="true">
  <svg viewBox="0 0 980 1100" xmlns="http://www.w3.org/2000/svg" focusable="false" preserveAspectRatio="xMidYMid meet">
   <defs>
    <linearGradient id="vx-steel" x1="4%" x2="93%" y1="10%" y2="92%">
     <stop offset="0%" stopColor="#090b0e"/><stop offset="9%" stopColor="#46474b"/>
     <stop offset="15%" stopColor="#f1e9df"/><stop offset="21%" stopColor="#444449"/>
     <stop offset="28%" stopColor="#101115"/><stop offset="37%" stopColor="#bbb4b0"/>
     <stop offset="44%" stopColor="#faf4ec"/><stop offset="49%" stopColor="#4e5056"/>
     <stop offset="56%" stopColor="#111216"/><stop offset="67%" stopColor="#c9c2be"/>
     <stop offset="72%" stopColor="#e2d9d2"/><stop offset="79%" stopColor="#434146"/>
     <stop offset="89%" stopColor="#b2a39b"/><stop offset="100%" stopColor="#101216"/>
    </linearGradient>
    <linearGradient id="vx-steel-edge" x1="3%" x2="98%" y1="0%" y2="90%">
     <stop offset="0%" stopColor="#15161b"/><stop offset="13%" stopColor="#f3eee6"/>
     <stop offset="34%" stopColor="#29292e"/><stop offset="51%" stopColor="#f9eee4"/>
     <stop offset="70%" stopColor="#1a1c20"/><stop offset="85%" stopColor="#918f93"/>
     <stop offset="100%" stopColor="#101115"/>
    </linearGradient>
    <linearGradient id="vx-pearl" x1="0%" x2="100%" y1="12%" y2="83%">
     <stop offset="0%" stopColor="#343034"/><stop offset="22%" stopColor="#aea1a0"/>
     <stop offset="49%" stopColor="#eee7de"/><stop offset="67%" stopColor="#3d3b3e"/>
     <stop offset="91%" stopColor="#a6a5a8"/><stop offset="100%" stopColor="#1b1a1c"/>
    </linearGradient>
    <radialGradient id="vx-aura" cx="56%" cy="42%" r="52%">
     <stop offset="0%" stopColor="#553234" stopOpacity=".19"/>
     <stop offset="64%" stopColor="#17161c" stopOpacity=".12"/>
     <stop offset="100%" stopColor="#08090b" stopOpacity="0"/>
    </radialGradient>
    <filter id="vx-shadow" x="-45%" y="-45%" width="190%" height="190%">
     <feGaussianBlur stdDeviation="32"/>
    </filter>
    <filter id="vx-soft" x="-10%" y="-10%" width="120%" height="120%">
     <feGaussianBlur stdDeviation="2.1"/>
    </filter>
   </defs>
   <ellipse cx="510" cy="560" rx="410" ry="495" fill="url(#vx-aura)"/>
   <g className="vx-sculpture-shadow" opacity=".68" stroke="#000000" strokeLinecap="round" fill="none" filter="url(#vx-shadow)">
    <path d="M670 115 C900 289 831 530 613 669 C412 796 270 883 408 1002 C551 1134 779 982 747 800" strokeWidth="207"/>
    <path d="M293 933 C74 741 191 460 377 346 C537 241 730 302 706 155" strokeWidth="180"/>
   </g>
   <g className="vx-sculpture-back" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M293 933 C74 741 191 460 377 346 C537 241 730 302 706 155" stroke="#090a0d" strokeWidth="190"/>
    <path d="M293 933 C74 741 191 460 377 346 C537 241 730 302 706 155" stroke="url(#vx-steel)" strokeWidth="166"/>
    <path d="M260 917 C91 726 211 491 385 377 C534 277 710 320 699 171" stroke="url(#vx-steel-edge)" strokeWidth="5" opacity=".9" filter="url(#vx-soft)"/>
    <path d="M326 943 C119 733 229 462 415 363" stroke="#f9eae0" strokeWidth="3.5" opacity=".58"/>
   </g>
   <g className="vx-sculpture-front" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M670 115 C900 289 831 530 613 669 C412 796 270 883 408 1002 C551 1134 779 982 747 800" stroke="#08090d" strokeWidth="203"/>
    <path d="M670 115 C900 289 831 530 613 669 C412 796 270 883 408 1002 C551 1134 779 982 747 800" stroke="url(#vx-steel-edge)" strokeWidth="180"/>
    <path d="M670 115 C900 289 831 530 613 669 C412 796 270 883 408 1002 C551 1134 779 982 747 800" stroke="url(#vx-steel)" strokeWidth="166" opacity=".83"/>
    <path d="M689 141 C862 331 791 525 599 654 C415 781 280 895 431 992" stroke="#fff6ed" strokeWidth="5" opacity=".45" filter="url(#vx-soft)"/>
    <path d="M634 151 C822 324 764 503 575 628 C396 752 283 879 397 968" stroke="#100e13" strokeWidth="8" opacity=".5"/>
    <path d="M685 157 C874 340 809 526 632 655" stroke="url(#vx-pearl)" strokeWidth="11" opacity=".61"/>
   </g>
   <g fill="#f5ede6">
    <ellipse cx="660" cy="136" rx="11" ry="4" transform="rotate(-35 660 136)" opacity=".8"/>
    <ellipse cx="723" cy="820" rx="15" ry="3" transform="rotate(53 723 820)" opacity=".75"/>
   </g>
  </svg>
 </div>;
}

/** A typographic material plate, not a screenshot or product mockup. */
export function TypographicPlate() {
 return <div className="vx-typeplate" aria-hidden="true">
  <div className="vx-typeplate-field">
   <span className="vx-typeplate-a">FORMA</span>
   <span className="vx-typeplate-w">FONDO</span>
   <span className="vx-typeplate-slit"/>
   <span className="vx-typeplate-foil"/>
  </div>
 </div>;
}

/** A single restrained motion study that exists as static art without JS. */
export function MotionStudy() {
 const bars = Array.from({ length: 22 }, (_, index) => index);
 return <div className="vx-motionstudy" aria-hidden="true">
  <div className="vx-motionstudy-core">
   {bars.map(index => <span className="vx-motionstudy-line" key={index}
    style={{ '--line-i': index } as CSSProperties}/>)}
  </div>
  <div className="vx-motionstudy-cut"/>
 </div>;
}
