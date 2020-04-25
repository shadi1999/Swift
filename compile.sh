#!/bin/bash
rm -rf public/*
mkdir public/files

mkdir public/files/tm390

cd ./client
# GENERATE_SOURCEMAP=false npm run build
node --max-old-space-size=4000 node_modules/react-scripts/scripts/build.js GENERATE_SOURCEMAP=false
cp -r build/* ../public/
cd ..
sudo NODE_ENV=production npm run server
