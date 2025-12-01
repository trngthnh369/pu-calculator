#!/bin/bash

# Script to generate PWA icons from a source image
# Requirements: ImageMagick installed (brew install imagemagick)

SOURCE_IMAGE="logo.png"  # Your source image (at least 512x512)
OUTPUT_DIR="public"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "macOS: brew install imagemagick"
    echo "Ubuntu: sudo apt-get install imagemagick"
    echo "Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check if source image exists
if [ ! -f "$SOURCE_IMAGE" ]; then
    echo "Source image '$SOURCE_IMAGE' not found!"
    echo "Please create a logo.png file (at least 512x512) in the project root"
    exit 1
fi

# Create icons directory
mkdir -p "$OUTPUT_DIR"

# Generate icons
echo "Generating PWA icons..."

convert "$SOURCE_IMAGE" -resize 72x72 "$OUTPUT_DIR/icon-72x72.png"
convert "$SOURCE_IMAGE" -resize 96x96 "$OUTPUT_DIR/icon-96x96.png"
convert "$SOURCE_IMAGE" -resize 128x128 "$OUTPUT_DIR/icon-128x128.png"
convert "$SOURCE_IMAGE" -resize 144x144 "$OUTPUT_DIR/icon-144x144.png"
convert "$SOURCE_IMAGE" -resize 152x152 "$OUTPUT_DIR/icon-152x152.png"
convert "$SOURCE_IMAGE" -resize 192x192 "$OUTPUT_DIR/icon-192x192.png"
convert "$SOURCE_IMAGE" -resize 384x384 "$OUTPUT_DIR/icon-384x384.png"
convert "$SOURCE_IMAGE" -resize 512x512 "$OUTPUT_DIR/icon-512x512.png"

echo "Icons generated successfully in $OUTPUT_DIR!"
echo ""
echo "Next steps:"
echo "1. Test your PWA: npm run dev"
echo "2. Check manifest: http://localhost:3000/manifest.json"
echo "3. Build for production: npm run build"