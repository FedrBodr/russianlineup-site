# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Single-page marketing landing for the "Русский Лайнап" brand (electric surfboards, test-days, camps, community). Pure static site — the entire site is one hand-written `index.html` with inline CSS and JS. No build step, no framework, no package.json. UI copy is in Russian.

## Working on it

- **Preview locally:** open `index.html` directly in a browser, or `python3 -m http.server` from the repo root. There is no build, lint, or test tooling.
- **Editing:** all markup, styles (`<style>` in `<head>`), and behavior (`<script>` blocks) live in `index.html`. The CSS uses a CSS-variable palette defined in `:root` (`--bg`, `--accent`, etc.).
- Asset/SEO files are siblings of `index.html`: `favicon.svg`, `bot_avatar.svg/.png`, `robots.txt`, `sitemap.xml`, `CNAME` (`russianlineup.ru`).

## Deploy

Push to **`master`** (the default branch) → GitHub Actions (`.github/workflows/deploy.yml`) FTP-uploads the repo to reg.ru hosting. `*.md`, `.git*`, and `.github/` are excluded from the upload. FTP credentials come from repo secrets (`FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`) and the `FTP_SERVER_DIR` variable. See `DEPLOY.md` for the one-time setup and the GitHub Pages / Amvera fallback options.

> Git auth note: the `origin` remote uses the `git@github-fedrbodr:...` SSH host alias (mapped to `~/.ssh/github_fedrbodr` → the `FedrBodr` account). Plain `git@github.com` would authenticate as the wrong identity and be denied.

## Architecture: the bot deep-link + analytics flow

This landing is the top of a funnel that ends in a Telegram bot (separate repo: https://github.com/FedrBodr/ruslineup-bot). The only real logic in the page is wiring CTAs to that bot with cross-session attribution:

1. `window.SITE_CONFIG` (top of `<head>`) holds the three deploy-time values: `botUsername`, `ymCounterId` (Yandex.Metrika), `ga4Id` (GA4). Analytics scripts are **placeholder-guarded** — Metrika/GA4 only initialize when these are replaced with real values (the code bails on `99999999` / `G-XXXXXXXXXX`).
2. Every CTA is an `<a class="js-bot" data-src="...">`. The bottom `<script>` intercepts clicks, fires `open_bot` goals to GA4 + Metrika, then asks Metrika for the visitor's `getClientID` (700ms timeout fallback).
3. It redirects to `https://t.me/<botUsername>?start=<source>__<clientId>`. The bot parses this `start` payload to stitch the web visit to in-Telegram actions — one end-to-end analytics identity. `source` comes from `utm_source` query param if present, else the link's `data-src`.

When adding a CTA, give it `class="js-bot"` and a unique `data-src` so it participates in this flow; don't hardcode `t.me` links.

## Before publishing / content placeholders

`index.html` ships with placeholders that must be filled before go-live (tracked in `CONTENT_TODO.md`): the `SITE_CONFIG` values (also replace `ga4Id` in the `gtag/js?id=` reference if you add the GA4 `<head>` tag), `[цена]`/`[в скобках]` price placeholders in the Электросёрф and Тест-день sections, the commented-out hero YouTube `<iframe>` (needs a video ID), and `og-cover.jpg` (1200×630) for social sharing.

Prices and Telegram community links are public marketing content and live in the page. Bot secrets (token, partner discount username, keys) belong only in the bot's env, never here.