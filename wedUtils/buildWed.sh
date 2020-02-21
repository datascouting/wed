#!/bin/bash

# Fix wed-metadata file
chmod +x /home/node/wed/bin/wed-metadata

# Open project path
cd /home/node/wed

# Remove previous build and node_modules
rm -fr ./build

# Install node mudules
yarn install

# Build with gulp
./node_modules/gulp/bin/gulp.js
