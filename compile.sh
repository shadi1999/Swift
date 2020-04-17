#!/bin/bash
rm -rf public/*
mkdir public/files

mkdir public/files/tm390

cd ./client
GENERATE_SOURCEMAP=false npm run build
cp -r build/* ../public/
cd ..
sudo NODE_ENV=production npm run server
