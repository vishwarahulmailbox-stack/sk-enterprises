# S K Enterprises — Website

A ground-up rebuild of the S K Enterprises marketing site. No Mobirise, no Bootstrap, no third-party builder — plain, hand-written HTML/CSS/JS that you fully own and can edit directly.

## What's in here

```
index.html          Full one-page site: hero, about, services, projects, why us, team, testimonials, contact
thank-you.html       Redirect target after the contact form is submitted
assets/css/main.css  Entire design system (colors, type, layout, components)
assets/js/main.js    Sticky nav, mobile menu, scroll reveal, project filter, testimonial scroller
assets/images/       Photos used on the site, resized and compressed for the web (18MB → 1.2MB total)
```

## Design

- **Type:** Fraunces (headlines), Inter (body text), JetBrains Mono (every number — sq ft, years, phone, stats), loaded from Google Fonts.
- **Color:** warm espresso ink, plaster/stone background, brass and deep teal accents (teal pulled from your existing logo mark).
- **Signature detail:** the corner-bracket "spec frame" around key photos and the dimension-tick marquee strip — a nod to floor plans and space planning, which is literally one of your services.
- Fully responsive (mobile nav collapses to a hamburger menu below ~860px), keyboard-focus visible on all interactive elements, and respects `prefers-reduced-motion`.

## Content

All copy (about, services, why-us, team, testimonials, contact details) is carried over from your original site — nothing invented. Testimonials were lightly cleaned up (emoji removed) to match the more editorial tone; the underlying quotes and names are unchanged.

Project photos are grouped into a filterable gallery (All / 2 BHK / 3 BHK / 4 BHK / Penthouse / Lobby) instead of five separate near-empty pages — easier to browse, and easier for you to maintain going forward.

## Contact form

Unchanged from before — POSTs directly to your existing Salesforce Web-to-Lead endpoint (`orgId 00DgK000005ZWoX`), no JavaScript library required, redirects to `thank-you.html` on submit.

## Deploying

Static site, no build step:

1. Upload the whole folder (keeping `index.html` and `assets/` as siblings) to Cloudflare Pages, or any static host.
2. Build command: none. Output directory: `/` (project root).

## Testing locally

Don't open `index.html` by double-clicking it from inside a zip — extract fully first, or better, run a local server from this folder:

```
python3 -m http.server 8000
```

then open `http://localhost:8000` in your browser.

## Changing content later

- **Text:** edit directly inside `index.html` — it's plain HTML, organized into clearly commented sections (`<!-- ============ Hero ============ -->` etc.).
- **Colors/fonts:** all defined once at the top of `assets/css/main.css` under `:root` — change a value there and it updates everywhere.
- **Adding a project photo:** drop the image into `assets/images/`, then copy an existing `.project-item` block in the Projects section and update the `src`, `alt`, `data-category`, and `.project-tag` text.
