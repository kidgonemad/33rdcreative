# 33rd Creative Site Documentation

## Project Structure

```
33rd creative site/
├── index.html              # Main gradient bar (entry point)
│
├── views/                  # Top-right menu views
│   ├── grid.html           # Tic-tac-toe 3x4 grid view
│   ├── sphere.html         # Icon sphere animation (zodiac symbols)
│   └── godrays.html        # 33 GLB 3D model viewer with god rays
│
├── tracks/                 # Bar segment content (artist/track pages)
│   ├── nuclear.html        # NUCLEAR image gallery
│   ├── lucki.html          # LUCKI image gallery
│   └── [future].html       # Template for new artists
│
├── assets/
│   ├── nuclear/            # Nuclear GIF images
│   ├── lucki/              # Lucki GIF images
│   └── 33.glb              # 3D model for godrays viewer
│
└── DOCUMENTATION.md        # This file
```

---

## Navigation Flow

### Main Page (index.html)
- 12 gradient bar segments representing tracks/artists
- Click segment → Opens corresponding track page
- Top-right menu icon cycles through views: Lines → Grid → Sphere → 33

### Views (Top-Right Menu)
| Icon | View | File |
|------|------|------|
| ☰ (lines) | Default main view | index.html |
| # (grid) | Tic-tac-toe grid | views/grid.html |
| ○ (circle) | Sphere animation | views/sphere.html |
| 33 | 3D model viewer | views/godrays.html |

### Tracks (Bar Segments)
| Segment | Track | Artist | Page |
|---------|-------|--------|------|
| 1 | NUCLEAR | SANNHET | tracks/nuclear.html |
| 2 | WAVES | FLYING LOTUS | - |
| 3 | DRIFT | TYCHO | - |
| 4 | 33 | BONOBO | views/godrays.html |
| 5 | WANT IT | MASSIVE ATTACK | - |
| 6 | ECHOES | BOARDS OF CANADA | - |
| 7 | PULSE | APHEX TWIN | - |
| 8 | LUCKI | BURIAL | tracks/lucki.html |
| 9 | FLUX | FOUR TET | - |
| 10 | HAZE | CARIBOU | - |
| 11 | BLOOM | MODERAT | - |
| 12 | STATIC | AMON TOBIN | - |

---

## Godrays Viewer Settings

### Hardcoded Defaults (views/godrays.html)
```javascript
// Camera
camera.position.set(X, Y, Z);
camera.fov = FOV;

// Model
model.position.set(X, Y, Z);
model.scale.setScalar(SCALE);

// Lighting
ambientLight.intensity = VALUE;
hemiLight.intensity = VALUE;
dirLight.intensity = VALUE;
pointLight.intensity = VALUE;

// God Rays
godRaysSettings = {
    density: VALUE,
    weight: VALUE,
    decay: VALUE,
    exposure: VALUE,
    samples: VALUE
};
```
> **Note:** Values to be filled after user configuration

### Controls
- Single circle button at bottom center
- ON (white): Plane024 glows (2.0), god rays visible
- OFF (dim): Plane024 dim (0.3), no god rays

---

## Adding New Content

### Adding a New Artist Gallery
1. Create `tracks/[name].html` (copy lucki.html as template)
2. Create `assets/[name]/` folder
3. Add images/GIFs to the folder
4. Update image array in the HTML file
5. Update index.html navigation if needed

### Adding New Images to Existing Gallery
1. Add image files to `assets/[artist]/` folder
2. Update the images array in `tracks/[artist].html`

---

## Changelog

### 2026-01-08 - Initial Reorganization
- Created folder structure (views/, tracks/)
- Extracted grid view to views/grid.html
- Moved icon-sphere.html to views/sphere.html
- Moved godrays-viewer.html to views/godrays.html
- Fixed godrays rays toggle (emissiveIntensity 0.3 when OFF)
- Simplified godrays to one button (circle)
- Extracted Lucki gallery to tracks/lucki.html
- Updated nuclear.html styling to match embedded version
- Simplified index.html to main bar + navigation
- Created this documentation file

---

## Technical Notes

### God Rays Effect
- Uses postprocessing library's GodRaysEffect
- Ray source: Plane024 mesh (emissive material)
- Toggle controls emissiveIntensity and effectPass.enabled

### Sphere Animation
- Uses CSS transforms and animations
- Zodiac/planetary symbols arranged in 3D space

### Grid View
- 3x4 grid of 3D perspective boxes
- Each box links to corresponding track

