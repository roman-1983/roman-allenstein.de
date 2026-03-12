# roman-allenstein.de

Personal website served by nginx:1-alpine behind Traefik.

## Structure

```
compose.yml        — Docker Compose stack
src/
├── index.html     — Single-page site
├── robots.txt
└── assets/        — Images and icons
```

## Deploy

```bash
docker compose up -d
```
