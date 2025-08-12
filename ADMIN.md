# Admin Guide: Add or Update Projects

Update `data/projects.json` to add a project card without touching HTML.

Each project entry supports:

- title: Project title
- slug: URL-safe unique id
- poster: Path to poster image (WebP preferred)
- video: MP4 or YouTube/Vimeo URL (optional)
- tags: ["Tech", ...]
- repo: Repository URL (optional)
- demo: Live demo URL (optional)
- downloads: array of file URLs (optional)
- summary: short description
- caseStudy: { problem, approach, implementation, results, learnings }

Steps:
1. Add images to `images/` (optimize, prefer WebP). Add MP4 to `videos/` if needed.
2. Edit `data/projects.json` and append a new entry.
3. Open `project.html` to verify card renders and hover/tap preview works.
4. Click a card to view details (modal or dedicated page if implemented).

# Contact/Hire Setup

Use EmailJS for static hosting.
1. Create an EmailJS account and a template with variables: name, email, phone, message, ts.
2. In `contact Me.html`, set attributes on the `<form name="contact-form">`:
   - `data-emailjs-service="YOUR_SERVICE_ID"`
   - `data-emailjs-template="YOUR_TEMPLATE_ID"`
   - `data-emailjs-user="YOUR_PUBLIC_KEY"`
3. Include EmailJS script tag before `js/contact.js` or via npm if bundling.

If EmailJS is not configured, submissions download a JSON file the user can email manually.


