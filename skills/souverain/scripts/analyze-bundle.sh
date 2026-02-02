#!/bin/bash
# Bundle Size Analyzer
# Checks dist/ output size after build

SOUVERAIN_PATH="${SOUVERAIN_PATH:-/home/ubuntu/clawd/SOUVERAIN}"
DIST_PATH="$SOUVERAIN_PATH/dist"

echo "📦 Bundle Size Analysis"
echo ""

if [ ! -d "$DIST_PATH" ]; then
  echo "❌ No dist/ folder found. Run 'npm run build' first."
  exit 1
fi

echo "📊 Total bundle size:"
du -sh "$DIST_PATH"

echo ""
echo "📂 Breakdown by folder:"
du -sh "$DIST_PATH"/* | sort -hr

echo ""
echo "🔍 Largest files (top 10):"
find "$DIST_PATH" -type f -exec du -h {} + | sort -hr | head -10

echo ""
echo "✅ Analysis complete"
