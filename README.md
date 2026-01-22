# Remotion Sandbox

A sandbox for testing Remotion animations and video generation.

## Setup

```bash
npm install
```

## Available Commands

### Start the Remotion Studio

```bash
npm start
```

This opens the Remotion Studio in your browser where you can preview all compositions in real-time.

### Render Videos

```bash
# Render HelloWorld composition to MP4
npm run render

# Render HelloWorld composition to GIF
npm run render:gif

# Render a single frame as PNG
npm run render:still

# Render LogoAnimation composition
npm run render:logo

# Render all compositions
npm run render:all
```

### Build for production

```bash
npm run build
```

## Compositions

This project includes three example compositions:

1. **HelloWorld** - A simple animated title with spring physics and gradient background
2. **LogoAnimation** - Animated "REMOTION" text with floating circles and spring entrances
3. **ColorfulShapes** - Colorful floating shapes with a counting animation

## Rendering Custom Compositions

You can render any composition with custom settings:

```bash
# Basic render
npx remotion render <CompositionId> <output-path>

# With custom frame range
npx remotion render HelloWorld out/clip.mp4 --frames=0-30

# Different codec
npx remotion render HelloWorld out/video.webm --codec=vp8

# Change resolution
npx remotion render HelloWorld out/small.mp4 --scale=0.5
```

## Learn More

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion GitHub](https://github.com/remotion-dev/remotion)
