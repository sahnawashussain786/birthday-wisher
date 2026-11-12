# Her photos live here

All ten photos are wired up. The site reads them by file name, so if you swap a
picture, keep the name (or update `data/site.ts` to match the new one).

| File | Where it appears |
| ---- | ---------------- |
| `01.jpg` | the big portrait in the intro section (feature) |
| `03, 06, 10, 07, 02, 09, 04, 08, 05` | the polaroid gallery, in that order |

The order and every caption live in `data/site.ts` — edit the `photos` array there
to reorder, re-cap, or swap a file. The feature portrait is `featurePhoto`.

**Good to know**

- All the frames are portrait (4:5-ish), so vertical photos look best.
- If a file is missing or renamed, that slot shows a soft placeholder naming the
  exact path to add — the page never looks broken.
- Keep files under ~1–2 MB each to stay quick.
