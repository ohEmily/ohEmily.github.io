#!/bin/bash
# deploy.sh
# Builds the production bundle and deploys to gh-pages branch
# Usage: ./deploy.sh or deno task deploy

set -e  # Exit on any error

echo "🔨 Building production bundle..."
npm run build

echo "📦 Preparing deployment files..."
# Create temporary directory for gh-pages content
TEMP_DIR=$(mktemp -d)

# Create production index.html with bundle.js instead of src/main.tsx
sed 's|<script type="module" src="src/main.tsx"></script>|<script type="module" src="bundle.js"></script>|' index.html > "$TEMP_DIR/index.html"

# Also update CSS path to be relative
sed -i '' 's|href="src/styles/global.css"|href="global.css"|' "$TEMP_DIR/index.html"

# Copy bundle and assets
cp bundle.js "$TEMP_DIR/"
cp src/styles/global.css "$TEMP_DIR/global.css"
cp -r images "$TEMP_DIR/"
cp favicon.svg "$TEMP_DIR/"

# Preserve custom domain configuration
if [ -f CNAME ]; then
  cp CNAME "$TEMP_DIR/"
fi

# Create 404.html for client-side routing fallback
cp "$TEMP_DIR/index.html" "$TEMP_DIR/404.html"

# Add .nojekyll to prevent GitHub Pages from processing files through Jekyll
touch "$TEMP_DIR/.nojekyll"

echo "🚀 Deploying to gh-pages branch..."
# Get current commit hash for reference
COMMIT_HASH=$(git rev-parse --short HEAD)

# Navigate to temp directory
cd "$TEMP_DIR"

# Initialize git and commit
git init
git add -A
git commit -m "Deploy from commit $COMMIT_HASH"

# Force push to gh-pages branch
git push -f git@github.com:ohEmily/ohEmily.github.io.git main:gh-pages

echo "✅ Deployment complete!"
echo "🌐 Site will be available at: https://ohemily.github.io"
echo ""
echo "Note: It may take a few minutes for GitHub Pages to update."

# Clean up
cd -
rm -rf "$TEMP_DIR"
