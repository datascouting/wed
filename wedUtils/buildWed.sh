#!/bin/bash

# Fix wed-metadata file
chmod +x /home/user/wed/bin/wed-metadata

# Open project path
cd /home/user/wed

# Remove previous build and node_modules
rm -fr ./build

# Install node mudules
npm install

# Build with gulp
./node_modules/gulp/bin/gulp.js
