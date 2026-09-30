# LOP3Z — Official Website

One-page site for **LOP3Z** (Singer // Rapper // Songwriter), built with **Astro + TypeScript + Tailwind CSS**. Static output, no database, deployed on **Netlify**.

- Optimized images (AVIF/WebP + JPEG fallback, responsive sizes, lazy-loaded)
- `lite-youtube-embed` for videos (no YouTube iframe until someone presses play)
- Netlify Forms booking form (honeypot, inline validation, success and error states, works without JavaScript)
- SEO: meta tags, Open Graph and Twitter cards, JSON-LD `MusicGroup`, `sitemap.xml`, `robots.txt`, favicons
- Optional Plausible analytics, switched on with one environment variable

---

## 1. Local development

Requires **Node 22.12+**.

```bash
npm install
npm run dev        # http://localhost:4321
```

Other commands:

| Command           | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `npm run build`   | Type-checks (`astro check`), then builds the static site into `dist/` |
| `npm run preview` | Serves the built `dist/` locally                                |
| `npm run assets`  | Rebuilds the cropped images, favicons and share image (see §4)  |

> The booking form only really submits on Netlify. Locally it shows the error state, which is expected.

## 2. Deploy to Netlify

**Option A: Git (recommended)**

1. Push this folder to a GitHub, GitLab or Bitbucket repo.
2. In Netlify, go to **Add new site → Import an existing project** and pick the repo.
3. Build settings are read from `netlify.toml` (`npm run build` → `dist`). Click **Deploy**.
4. After the first deploy, open **Forms** in the Netlify dashboard and enable form detection if prompted. The `booking` form appears after the next deploy.
5. Set up email alerts for new bookings: **Site configuration → Notifications → Emails and webhooks → Form submission notifications** → add `vibezbylop3z@gmail.com`.
6. Optional: under **Domain management**, add a custom domain, then set `SITE_URL` (see §3) and redeploy.

**Option B: Netlify CLI**

```bash
npm install -g netlify-cli
netlify login
netlify init        # first time: create/link the site
netlify deploy --build --prod
```

## 3. Environment variables

Set these in Netlify under **Site configuration → Environment variables**. For local testing, copy `.env.example` to `.env`.

| Variable                  | Purpose                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `SITE_URL`                | Canonical URL, e.g. `https://lop3z.com`. Used in SEO tags, sitemap and robots. If unset, Netlify's own URL is used. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | The domain registered in Plausible. **Leave empty to disable analytics**; no script is output. |
| `PUBLIC_PLAUSIBLE_SRC`    | Optional custom or self-hosted Plausible script URL.                                           |

Redeploy after changing any of them.

## 4. Where to change things

### Text, links, singles, videos, contact details → `src/data/site.ts`

Everything editable is in this one file:

- `artist`: name, roles, tagline, bio, statement line
- `seo`: page title, description, share-image alt text
- `featured`: the single used by the hero badge, "Stream now" and the Spotify player (change `spotify` **and** `spotifyEmbed`)
- `singles`: the Music grid. Add or remove entries; a single without `cover` gets a typographic tile.
- `videos`: YouTube ID, link and poster image for each video
- `contact`: email, phone, WhatsApp link, management
- `streaming` / `socials`: every profile link. These also feed the JSON-LD `sameAs` list and the footer icons.

### Images → `src/assets/images/`

The site uses the optimized copies in `src/assets/images/`, not the originals.

**Swapping a photo:**

- **Quick way:** replace the file in `src/assets/images/`, keeping the same filename. It's optimized automatically at build time.
- **Through the pipeline:** put the new original in `public/images/lop3z-website-kit/` (or `public/images/`) and run `npm run assets`. This also regenerates `public/og-image.jpg` and the favicons from `cover-omds.jpg`.
  - Some originals were phone screenshots with borders. They are cropped by the `CROPS` table in `scripts/prepare-images.mjs`; set a file's entry to `null` if a new photo needs no crop.
- **Adding a new cover:** import it at the top of `src/data/site.ts` and reference it in `singles` or `videos`.

### Design → `src/styles/global.css`

Colors, fonts and animations are defined as tokens in the `@theme` block (`--color-cyan`, `--color-amber`, etc.).

### Page sections → `src/components/`

`Hero`, `Music`, `Statement`, `Videos`, `About`, `Contact` and `Footer`, assembled in `src/pages/index.astro`.

## 5. Project structure

```
public/                 favicons, og-image.jpg, site.webmanifest, original photo kit
scripts/prepare-images.mjs  crop originals → src/assets, generate favicons + OG image
src/
  assets/images/        optimized-at-build source images
  components/           page sections + Icon/Equalizer helpers
  data/site.ts          ALL editable content
  layouts/BaseLayout.astro  <head>: SEO, JSON-LD, fonts, analytics
  pages/                index, thanks (no-JS form fallback), 404, robots.txt, sitemap.xml
  styles/global.css     Tailwind theme + custom styles
netlify.toml            build config, cache + security headers
```

## 6. Accessibility and performance notes

- The skip link, visible focus rings, labelled landmarks and every nav target work from the keyboard. Form errors are tied to their fields with `aria-describedby` and `aria-invalid`, and the result is announced through a `role="status"` region.
- `prefers-reduced-motion` stops the equalizer, the gradient shimmer, the scroll reveals and smooth scrolling.
- The hero image is the only eagerly loaded image. Everything else, including the Spotify player, is lazy-loaded. YouTube loads only when play is pressed, and uses `youtube-nocookie.com`.
- Fonts are self-hosted with Fontsource, so there are no Google Fonts requests; the main display font is preloaded.
