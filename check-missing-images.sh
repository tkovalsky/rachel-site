#!/bin/bash

echo "🔍 Checking for missing area images..."
echo ""

# Create neighborhoods directory if it doesn't exist
mkdir -p public/neighborhoods

# Define required images
declare -a required_images=(
    "boca-raton-mizner.jpg.webp"
    "boynton-beach-inet.jpg"
    "delray-beach-east-delray.jpg"
    "lake-worth-downtown.jpg"
    "wellington-equestrian.jpg"
    "west-palm-beach-downtown.jpg"
)

echo "📁 Checking images in public/neighborhoods/:"
echo ""

missing_count=0
existing_count=0

for image in "${required_images[@]}"; do
    if [ -f "public/neighborhoods/$image" ]; then
        echo "✅ $image - EXISTS"
        ((existing_count++))
    else
        echo "❌ $image - MISSING"
        ((missing_count++))
    fi
done

echo ""
echo "📊 Summary:"
echo "   Existing: $existing_count"
echo "   Missing: $missing_count"

if [ $missing_count -gt 0 ]; then
    echo ""
    echo "🖼️  You need to add these missing images to public/neighborhoods/:"
    for image in "${required_images[@]}"; do
        if [ ! -f "public/neighborhoods/$image" ]; then
            echo "   - $image"
        fi
    done
    echo ""
    echo "💡 Tip: Visit https://rachel-site.vercel.app/areas to see which images are missing visually"
else
    echo ""
    echo "🎉 All area images are present!"
fi
