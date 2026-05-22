# Washer Architecture — Portfolio Website

A static marketing/portfolio site for Washer Architecture, built with Astro + Tailwind CSS and deployed to Cloudflare Pages.

## Commands

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Start local dev server (port 5000)        |
| `npm run build`   | Build production site to `./dist/`        |
| `npm run preview` | Preview production build locally          |

## Cloudflare Pages Deployment

This site uses a **Cloudflare Pages Function** (`/functions/api/contact.ts`) to handle contact form submissions via SendGrid. The static site output goes to `dist/` and the `functions/` directory is deployed automatically alongside it.

### Required Environment Variables

Set these in the Cloudflare Pages dashboard under **Settings → Environment Variables**:

| Variable             | Description                                                  |
| :------------------- | :----------------------------------------------------------- |
| `SENDGRID_API_KEY`   | SendGrid API key with **Mail Send** permission               |
| `CONTACT_TO_EMAIL`   | Address that receives form submissions                       |
| `CONTACT_FROM_EMAIL` | Address emails are sent from (must be verified in SendGrid)  |
| `SITE_NAME`          | *(optional)* Sender name — defaults to `"Washer Architecture"` |

### SendGrid Setup

1. Create a free SendGrid account at [sendgrid.com](https://sendgrid.com).
2. Generate an API key: **Settings → API Keys → Create API Key** → choose **Restricted Access → Mail Send**.
3. Verify your sending domain or at minimum a single sender email under **Settings → Sender Authentication**.
4. Set `CONTACT_FROM_EMAIL` to that verified address. Emails sent from an unverified address will be rejected by SendGrid.

### Local Development Note

The `/api/contact` endpoint only runs on Cloudflare Pages infrastructure — it will not work with `npm run dev`. To test the function locally, use [Wrangler](https://developers.cloudflare.com/workers/wrangler/):

```bash
npx wrangler pages dev dist --compatibility-date=2024-01-01
```

Run `npm run build` first to populate `dist/`.
