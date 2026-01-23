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

### Fast Iteration from Command Line

For rapid debugging of React runtime errors without opening a browser:

```bash
# Start dev server in background and log to file
deno task dev > /tmp/deno-dev.log 2>&1 & echo $!

# Run headless browser simulation to capture console errors
node repro.js
```

This workflow:
1. Runs the dev server in the background, redirecting output to `/tmp/deno-dev.log`
2. Prints the background process PID (use `kill <PID>` to stop when done)
3. Uses Puppeteer to load the page headlessly and output all console logs/errors

Useful for catching React errors, missing imports, or runtime issues without manual browser testing.

### Linting

```bash
# Install dependencies (first time only)
npm install

# Run all linters (TypeScript/React + CSS)
npm run lint

# Auto-fix issues where possible
npm run lint:fix
```

Individual linters:
- `npm run lint:js` - ESLint for TypeScript/React
- `npm run lint:css` - Stylelint for CSS

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
- **Linting**: ESLint + Stylelint
- **Deployment**: GitHub Pages (gh-pages branch)

