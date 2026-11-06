# The Troubleshooter

An installable web app for machine troubleshooting: 3D model, faults, I/O, sequence, exploded views, cabinet layouts and product defects. It works offline after the first open.

## Put it on GitHub Pages
1. Create a repository (for example `the-troubleshooter`).
2. Upload **everything in this folder**, keeping the `lib`, `fonts` and `icons` folders as they are.
3. Add your machine's `profile.json` next to `index.html` (Setup & sources → Download profile, then rename the file). Without it, the app shows the example machine.
4. Settings → Pages → Deploy from a branch → `main` / root → Save. The site is live at `https://<user>.github.io/<repo>/` in a minute or two.

> GitHub Pages sites are public on most plans. Only GitHub Enterprise Cloud can limit a Pages site to your organization. Don't publish a profile built from confidential drawings on a public site.

## Install it
- **Windows / Mac (Chrome or Edge):** open the site, then click **Install app** in the top-left, or the install icon in the address bar.
- **Android (Chrome):** open the site, tap **Install app**, or menu ⋮ → Install app / Add to Home screen.
- **iPhone / iPad (Safari):** open the site, tap Share → **Add to Home Screen**.
- **Managed devices:** IT can deploy the site URL as a web app through Intune or Google Admin.

## Update it
- New machine data: replace `profile.json` in the repo. Installed apps pick it up the next time they open with a connection.
- New app version: upload the new files. Installed apps update on their next online open.

## Notes
- **Offline:** everything works offline after one online open. Changes made in the app (imported spreadsheets, pasted AI replies) are saved on that device only; publish a new `profile.json` to share them.
- **Build from documents** needs Claude and only works in the claude.ai version of the template. In the app, use the spreadsheet or another AI tool (Setup & sources).
- One machine per repository (or per folder, each with its own `index.html` and `profile.json`).
