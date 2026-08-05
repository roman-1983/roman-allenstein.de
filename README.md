# roman-allenstein.de

Personal website served by nginx:1-alpine behind Traefik.

## Structure

```
compose.yml          - Docker Compose stack
src/
├── index.html       - Single-page site
├── robots.txt
├── css/             - Stylesheets (style.css, references.css)
├── js/              - Scripts (main.js, references.js)
├── references/      - Case studies, reachable by URL only (noindex, unlinked)
│   ├── index.html   - /references/ overview
│   └── stubenheld/  - /references/stubenheld/
└── assets/          - Images and icons
```

## Deploy

```bash
docker compose up -d
```
