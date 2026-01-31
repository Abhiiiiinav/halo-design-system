# HALO Design System

Duotone and Atkinson dithering components for React.

## Tech Stack

- **React 19** + TypeScript
- **Vite 7** for build tooling
- **Three.js** + React Three Fiber for WebGL effects
- **Canvas API** for Atkinson dithering

## Installation

```bash
git clone https://github.com/JaideepCherukuri/halo-design-system.git
cd halo-design-system
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Components

| Component | Description |
|-----------|-------------|
| `DitheredImage` | Atkinson dithering with duotone color mapping |
| `DitherCard` | Card with CSS-based dither effects |
| `DuotoneImageUploader` | Upload images and apply duotone/dither effects |
| `DuotoneSamples` | Theme preset showcases (dark, light, agentic) |
| `InteractiveDither` | WebGL-based animated dither waves with mouse interaction |

## License

MIT
