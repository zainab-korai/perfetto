import type { ReactNode } from "react";

const O = "#1f2d27"; // outline colour

export const TILE_BG: Record<string, string> = {
  "weight-management": "#DDF1DF",
  "hair-care": "#F1E4F7",
  "skin-care": "#FDE4EC",
  "bones-joints": "#DCE8F8",
  "weight-loss-products": "#FFE9CF",
  "weight-gaining-products": "#FFF1C2",
  "new-arrivals": "#D9F3EE",
  "immune-system": "#FFE3DD",
};

const ART: Record<string, ReactNode> = {
  // Weighing scale
  "weight-management": (
    <>
      <rect x="9" y="11" width="46" height="43" rx="12" fill="#4CAF7A" stroke={O} strokeWidth="2" />
      <path d="M19 31a13 13 0 0 1 26 0z" fill="#fff" stroke={O} strokeWidth="2" />
      <path d="M32 31l6-9" stroke="#E5484D" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="31" r="2.5" fill={O} />
      <ellipse cx="23" cy="43" rx="5" ry="3.5" fill="#2E7D4F" />
      <ellipse cx="41" cy="43" rx="5" ry="3.5" fill="#2E7D4F" />
    </>
  ),
  // Hair oil bottle
  "hair-care": (
    <>
      <rect x="26" y="5" width="12" height="9" rx="2.5" fill="#7B4FA0" stroke={O} strokeWidth="2" />
      <rect x="28" y="14" width="8" height="6" fill="#D9C2EC" stroke={O} strokeWidth="2" />
      <rect x="16" y="20" width="32" height="38" rx="9" fill="#B58BD9" stroke={O} strokeWidth="2" />
      <rect x="21" y="31" width="22" height="18" rx="5" fill="#fff" />
      <path d="M32 33c3.5 4.5 5.5 6.8 5.5 9a5.5 5.5 0 0 1-11 0c0-2.2 2-4.5 5.5-9z" fill="#8E44AD" />
    </>
  ),
  // Cream jar + sparkle
  "skin-care": (
    <>
      <rect x="11" y="15" width="40" height="13" rx="6" fill="#F06292" stroke={O} strokeWidth="2" />
      <rect x="9" y="28" width="44" height="26" rx="9" fill="#FCE4EC" stroke={O} strokeWidth="2" />
      <rect x="21" y="36" width="20" height="10" rx="5" fill="#fff" />
      <path d="M53 6l2.3 5.7L61 14l-5.7 2.3L53 22l-2.3-5.7L45 14l5.7-2.3z" fill="#F6C343" stroke={O} strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  // Bone
  "bones-joints": (
    <g transform="rotate(-45 32 32)">
      <circle cx="12" cy="25" r="6.5" fill="#F8ECDB" stroke={O} strokeWidth="2" />
      <circle cx="12" cy="39" r="6.5" fill="#F8ECDB" stroke={O} strokeWidth="2" />
      <circle cx="52" cy="25" r="6.5" fill="#F8ECDB" stroke={O} strokeWidth="2" />
      <circle cx="52" cy="39" r="6.5" fill="#F8ECDB" stroke={O} strokeWidth="2" />
      <rect x="10" y="27" width="44" height="10" fill="#F8ECDB" />
      <path d="M10 27h44M10 37h44" stroke={O} strokeWidth="2" />
    </g>
  ),
  // Measuring tape
  "weight-loss-products": (
    <>
      <circle cx="28" cy="32" r="20" fill="#FFB347" stroke={O} strokeWidth="2" />
      <circle cx="28" cy="32" r="8" fill="#fff" stroke={O} strokeWidth="2" />
      <rect x="44" y="40" width="17" height="11" rx="2.5" fill="#FFE082" stroke={O} strokeWidth="2" />
      <path d="M49 40v5M53 40v3M57 40v5" stroke={O} strokeWidth="1.6" />
    </>
  ),
  // Dumbbell
  "weight-gaining-products": (
    <>
      <rect x="14" y="29" width="36" height="6" rx="3" fill="#90A4AE" stroke={O} strokeWidth="2" />
      <rect x="8" y="17" width="9" height="30" rx="3.5" fill="#FF8A3D" stroke={O} strokeWidth="2" />
      <rect x="47" y="17" width="9" height="30" rx="3.5" fill="#FF8A3D" stroke={O} strokeWidth="2" />
      <rect x="3" y="23" width="5" height="18" rx="2.5" fill="#E86A1A" stroke={O} strokeWidth="2" />
      <rect x="56" y="23" width="5" height="18" rx="2.5" fill="#E86A1A" stroke={O} strokeWidth="2" />
    </>
  ),
  // Gift box
  "new-arrivals": (
    <>
      <rect x="10" y="29" width="44" height="26" rx="3.5" fill="#4DB6A5" stroke={O} strokeWidth="2" />
      <rect x="7" y="21" width="50" height="10" rx="3.5" fill="#2E9C8B" stroke={O} strokeWidth="2" />
      <rect x="29" y="21" width="6" height="34" fill="#F6C343" stroke={O} strokeWidth="2" />
      <path d="M32 21c-8-1-14-4-11-9s11 1 11 9c0-8 8-14 11-9s-3 8-11 9z" fill="#F6C343" stroke={O} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  // Shield with plus
  "immune-system": (
    <>
      <path d="M32 6l20 7v15c0 14-9 23-20 30C21 51 12 42 12 28V13z" fill="#FF7A6B" stroke={O} strokeWidth="2" strokeLinejoin="round" />
      <rect x="29" y="19" width="6" height="22" rx="2" fill="#fff" />
      <rect x="21" y="27" width="22" height="6" rx="2" fill="#fff" />
    </>
  ),
};

export default function CategoryIcon({ slug, className = "h-10 w-10" }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      {ART[slug] ?? <circle cx="32" cy="32" r="16" fill="#C9D9C4" stroke={O} strokeWidth="2" />}
    </svg>
  );
}