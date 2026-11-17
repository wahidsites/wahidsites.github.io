WAHIDSITES — COMPLETE WEBSITE
================================

UPLOAD THESE FILES TO THE ROOT OF YOUR GitHub Pages REPOSITORY.

Files:
- index.html
- projects.html
- about.html
- services.html
- reviews.html
- contact.html
- styles.css
- app.js

IMPORTANT:
1. Remove the old website files from the repository.
2. Upload ALL 8 files above directly into the repository root.
3. Do not put styles.css or app.js inside an assets folder.
4. Keep the exact lowercase filenames.
5. Commit the upload to the main branch.
6. Wait a minute, then hard-refresh the live site (Cmd + Shift + R).

The site uses root-relative file references:
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>

The Projects page includes PlateCount and known portfolio links, then attempts to load public repositories from the wahidsites GitHub account. If GitHub's API is unavailable, the featured projects still appear.

The contact form opens the visitor's email app; it does not require a backend or external form provider.
