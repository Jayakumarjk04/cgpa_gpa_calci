#!/bin/bash

echo "🔍 Building and previewing GPA Calculator..."
echo "=========================================="

# Build the project
npm run build

# Serve locally
echo "🌐 Starting local server..."
echo "📱 Open http://localhost:3000 in your browser"
npx serve out -p 3000
