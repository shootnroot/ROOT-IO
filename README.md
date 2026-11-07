# ROOT /IO

ROOT /IO — Industrial Diagnostic Intelligence. An installable web app for machine troubleshooting: 3D model, faults, I/O, sequence, exploded views, cabinet layouts and product defects. It works offline after the first open.

## Put it on GitHub Pages
1. Create a repository (for example `the-troubleshooter`).
2. Select **all the files in this folder** and upload them together (Add file → Upload files). There are no sub-folders: every file sits next to `index.html`.
3. Machines: upload every machine profile (`.json`) next to `index.html`, and list them in `machines.json` (see **Machine library** below). With a single machine you can instead name its file `profile.json`. Without either, the app shows the example machine.
4. Settings → Pages → Deploy from a branch → `main` / root → Save. The site is live at `https://<user>.github.io/<repo>/` in a minute or two.

> GitHub Pages sites are public on most plans. Only GitHub Enterprise Cloud can limit a Pages site to your organization. Don't publish a profile built from confidential drawings on a public site.

## Machine library
`machines.json` lists the machines the app offers in its **Machine** menu (top left):

```json
[
 {"file": "honda-hrn216-profile.json", "name": "Honda HRN216 lawn mower", "group": "Vehicles and outdoor"},
 {"file": "press-14.json", "name": "Press 14 — LS Mtron", "group": "Molding cell"}
]
```

- `file` is the profile's file name in the repository; `name` is what the menu shows; `group` (optional) groups the menu.
- To add a machine: Setup & sources → **Download profile**, upload the file to the repository, then edit `machines.json` on GitHub (pencil icon) and add a line. Mind the commas between lines.
- Every machine has its own link: `https://<user>.github.io/<repo>/?m=honda-hrn216` (the file name without `.json` and without `-profile`). Setup & sources → **Copy link to this machine** gives it to you; put it in a QR code on the machine.
- The app remembers the last machine picked on each device. Every listed machine is also saved for offline use after one online open.
- A profile imported on a device (Import profile / spreadsheet / AI reply) stays on that device only, shown as "Imported in this browser". Upload it to the repository to share it.

## Install it
- **Windows / Mac (Chrome or Edge):** open the site, then click **Install app** in the top-left, or the install icon in the address bar.
- **Android (Chrome):** open the site, tap **Install app**, or menu ⋮ → Install app / Add to Home screen.
- **iPhone / iPad (Safari):** open the site, tap Share → **Add to Home Screen**.
- **Managed devices:** IT can deploy the site URL as a web app through Intune or Google Admin.

## Update it
- New or changed machine data: upload the profile file again (same name) and update `machines.json` if you added one. Installed apps pick it up the next time they open with a connection.
- New app version: upload the new files. Installed apps update on their next online open.

## Notes
- **Offline:** everything works offline after one online open. Changes made in the app (imported spreadsheets, pasted AI replies) are saved on that device only; publish a new `profile.json` to share them.
- **Build from documents** needs Claude and only works in the claude.ai version of the template. In the app, use the spreadsheet or another AI tool (Setup & sources).
- One repository holds any number of machines through `machines.json`.
