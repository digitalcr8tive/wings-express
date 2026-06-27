# Wing Express Design System

## Theme

An appetite-first digital food-truck poster: near-black night-service atmosphere, hard white structure, Wing Express red actions, and real food photography. The approved north star is the split black-and-photo hero, compact menu-highlight strip, and black/photo/red community triptych. The interface keeps strong rectangular geometry and clear ordering controls, avoiding corporate restaurant-template polish.

## Color

- Background: `oklch(0.08 0 0)`
- Surface: `oklch(0.14 0.01 25)`
- White: `oklch(1 0 0)`
- Ink on light: `oklch(0.12 0.01 25)`
- Brand red: `oklch(0.56 0.22 27)`
- Deep sauce: `oklch(0.37 0.16 27)`
- Fried accent: `oklch(0.74 0.16 65)`
- Success: `oklch(0.55 0.14 145)`

## Typography

Use a bold system slab-serif stack for display copy as a temporary match to the menu identity. Use a humanist system sans-serif for body text and ordering controls. Display headings use fluid sizing with a maximum of 6rem; body text remains at least 1rem.

## Components

Buttons are rectangular with slightly clipped corners, 48px minimum height, direct verb-object labels, and obvious focus states. Menu items use separators and spacing rather than nested cards. Ordering uses native dialogs, visible labels, error messages beneath fields, and an always-accessible cart summary.

## Layout

Mobile-first. The mobile experience uses one column, a compact sticky header, and a bottom pickup/cart action. Desktop uses a split hero, three-item menu-highlight strip, community/location triptych, and a two-column full menu plus sticky flavor board. Section rhythm alternates dense ordering controls with high-contrast brand-story space.

## Motion

One short hero entrance and purposeful drawer/dialog transitions. Buttons provide immediate press feedback. All motion is removed or reduced under `prefers-reduced-motion`.
