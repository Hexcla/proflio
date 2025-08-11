# Portfolio (proflio)

Static portfolio site upgraded with:
- Dark/Light theme toggle (persisted)
- Video-first project cards rendered from `data/projects.json`
- Contact form via EmailJS with downloadable JSON fallback
- SEO files `robots.txt`, `sitemap.xml`

## Local development

Option A: open `index.html` directly in a browser.

Option B (recommended for fetch/local JSON):
```
npx http-server .
```
Then visit the shown URL (often `http://127.0.0.1:8080`).

## Configure EmailJS (static email)

1. Create an EmailJS account and a template with variables: `name`, `email`, `phone`, `message`, `ts`.
2. In `contact Me.html`, set attributes on the `<form name="contact-form">`:
   - `data-emailjs-service="YOUR_SERVICE_ID"`
   - `data-emailjs-template="YOUR_TEMPLATE_ID"`
   - `data-emailjs-user="YOUR_PUBLIC_KEY"`
3. Ensure the EmailJS script is loaded (already included).

If not configured, submissions will download a JSON log that can be emailed manually.

## Add a project

See `ADMIN.md`. Edit `data/projects.json` and add poster/video assets.

## Deployment

- GitHub Pages: serve from root `proflio/`
- Netlify / Vercel: deploy as static site; update `sitemap.xml` URLs
