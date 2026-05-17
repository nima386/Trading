# 🔥 KASAI – Train Like Fire

Premium Fitness Tracker als Progressive Web App (PWA).

## Live testen

Nach dem Push auf GitHub Pages erreichbar unter:
```
https://<dein-username>.github.io/<repo-name>/
```

## Auf dem iPhone installieren

1. Seite in **Safari** öffnen
2. Unten auf **Teilen** (□↑) tippen
3. **„Zum Home-Bildschirm"** wählen
4. KASAI erscheint als App-Icon – kein App Store nötig

## GitHub Pages aktivieren

1. Repo auf GitHub öffnen → **Settings**
2. Links: **Pages**
3. Source: **GitHub Actions**
4. Beim nächsten Push wird automatisch deployed

## Struktur

```
kasai-pwa/
├── index.html          # Haupt-App
├── manifest.json       # PWA Manifest
├── sw.js               # Service Worker (Offline-Support)
├── icons/              # App Icons
│   ├── icon-192.png
│   ├── icon-512.png
│   └── app-logo-b5.svg
├── styles/
│   └── premium-ux.css
├── js/core/
│   └── version.js
└── .github/workflows/
    └── deploy.yml      # Auto-Deploy auf GitHub Pages
```

## Features

- ✅ Installierbar als PWA (iOS & Android)
- ✅ Offline-fähig via Service Worker
- ✅ Push-Benachrichtigungen
- ✅ Dark Mode, Premium Design
- ✅ Tageszeit-Struktur (Morgens / Mittags / Abends)
