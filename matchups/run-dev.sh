#!/bin/bash

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found in the current directory."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install Node.js and npm."
    exit 1
fi

# Check if the dev script exists in package.json
if ! grep -q '"dev":' package.json; then
    echo "Error: No 'dev' script found in package.json."
    exit 1
fi

# Install dependencies if node_modules is missing
if [ ! -d "node_modules" ]; then
    echo "node_modules not found. Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies."
        exit 1
    fi
fi

# Run the Next.js dev server with live reloading
echo "Starting Next.js development server with live reloading..."
npm run dev