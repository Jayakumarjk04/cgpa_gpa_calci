#!/bin/bash

echo "🎓 Quick Deploy GPA Calculator"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Make sure you're in the project directory."
    exit 1
fi

# Check if Firebase is initialized
if [ ! -f "firebase.json" ]; then
    echo "🔧 Firebase not initialized. Setting up..."
    firebase init hosting
fi

# Build and deploy
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "🚀 Deploying to Firebase..."
    firebase deploy --only hosting
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment successful!"
        echo "🌍 Your GPA Calculator is now live!"
        echo "📱 Check your Firebase Console for the URL"
        
        # Get the hosting URL
        echo "🔗 Getting your app URL..."
        firebase hosting:channel:list
    else
        echo "❌ Deployment failed!"
    fi
else
    echo "❌ Build failed!"
fi
