#!/bin/bash

# Build the Next.js project
echo "Building Next.js project..."
npm run build

# Copy public assets directly to the root of .next
echo "Copying public directory contents to .next root..."
cp -rv public/* .next/

# Verify the copy operation
echo "Verifying copied files..."
find .next -type f -path "*logos*" | head -5
find .next -type f -path "*banners*" | head -5

# Deploy to Netlify
echo "Deploying to Netlify..."
npx netlify deploy --dir=.next --prod --site=ad58a82b-cb37-408a-b1df-c805fecdd7cd
