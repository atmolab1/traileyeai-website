# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

Static multilingual marketing site. No build step or package manager is required.
Preview: `python -m http.server 8080`; validate scripts with `node --check <file.js>`.
Check pricing and download pages at desktop and mobile widths before publishing.

`index.html` is the canonical English homepage and contains SoftwareApplication
JSON-LD offers. `homepage.js` modifies the homepage at runtime, then loads
`languages.js` and `languages-extra.js`. The latter translates pricing strings.
English workflow pages use `script.js`, `subpage-languages.js` and
`subpage-fulltext.js`; the last script replaces whole paragraphs and edition lists.
German routes under `de/` are separate static pages. Update all affected layers;
editing the homepage alone leaves stale limits in translated text and SEO pages.

Approved offer: Free 100 photos/run, DeepFaune 38 classes, one folder, no video;
Explorer EUR 29 once, 3000 photos/run, DeepFaune 38 classes, subfolders, one computer;
Professional EUR 89 once, Google SpeciesNet 2000+ labels, unlimited photos, video,
subfolders, two computers. All models are bundled; no first-run model download.
SpeciesNet labels include higher taxa and non-animal classes, not only species.
Lemon Squeezy prices and activation limits are configured separately from this site.

Keep installer version, URL and checksum tied to the actual published release.
See DEPLOYMENT.md for outstanding release coordination. Do not publish a new
installer version or checksum merely because the application source changed.
Before broad exploration, query graphify-out/graph.json if available.
