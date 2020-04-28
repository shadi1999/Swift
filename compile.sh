#!/bin/bash

# This script compiles the client code,
# moves it to the static/public folder
# of the server and runs the server in
# production mode.

rm -rf public/*
mkdir public/files

cd ./client
# GENERATE_SOURCEMAP=false npm run build
# node --max-old-space-size=4000 node_modules/react-scripts/scripts/build.js GENERATE_SOURCEMAP=false
node --max-old-space-size=4000 node_modules/react-scripts/scripts/build.js
cp -r build/* ../public/
cd ..
sudo NODE_ENV=production npm run server
