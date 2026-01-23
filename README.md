# Personal Website 


## Features

- Terminal-inspired design with accessible colors (WCAG AA) 
- Responsive split-screen layout (desktop) / single-column (mobile)
- Built with Deno's native JSX/TSX support (no build tools needed for dev)

## Development

### Install Deno

```bash
# macOS/Linux
curl -fsSL https://deno.land/install.sh | sh

# Or via Homebrew
brew install deno
```

### Run Development Server

```bash
# Start local dev server with hot reload
deno task dev

# Open http://localhost:8000 in your browser
```

The dev server watches for file changes and auto-reloads.

### Project Structure

```
ohEmily.github.io/
├── src/
│   ├── components/     # React components (Sidebar, Timeline, etc.)
│   ├── pages/          # Page components (Home, Resume)
│   ├── data/           # Timeline data for experience/education
│   └── styles/         # Global CSS with terminal theme
├── images/             # Portrait photos
├── index.html          # HTML entry point
├── deno.json           # Deno configuration and tasks
└── deploy.sh           # Deployment script
```

## Deployment

### Build Production Bundle

```bash
# Create optimized bundle.js
deno task build
```

### Deploy to GitHub Pages

```bash
# Build and deploy to gh-pages branch
deno task deploy
```

This will:
1. Build the production bundle
2. Copy necessary files (index.html, bundle.js, images)
3. Push to `gh-pages` branch
4. Your site will be live at https://ohemily.github.io

**Note:** First-time config in GitHub Pages:
1. Go to repository Settings → Pages
2. Set source to "Deploy from a branch"
3. Select `gh-pages` branch and `/ (root)` directory
4. Save

## Customization

### Updating

- **Timeline data**: Edit `src/data/timeline.ts`
- **About section**: Edit `src/pages/Home.tsx`
- **Resume link**: Edit `src/pages/Resume.tsx`
- **Social links**: Edit `src/components/Sidebar.tsx`
- **Photos**: Replace images in `images/` directory

### Modify Design

- **Colors/theme**: Edit CSS variables in `src/styles/global.css`
- **Layout**: Modify grid columns in `.app-container` media query
- **Typography**: Change `--font-mono` in `:root`

## Tech Stack

- **Runtime**: Deno 2.x
- **Framework**: React 18
- **Routing**: React Router 6
- **Styling**: Vanilla CSS with custom properties
- **Deployment**: GitHub Pages (gh-pages branch)

