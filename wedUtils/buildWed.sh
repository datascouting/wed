#!/bin/bash

# Fix wed-metadata file
chmod +x /home/user/wed/bin/wed-metadata

# Open project path
cd /home/user/wed

# Remove previous build and node_modules
rm -fr ./build

# Fix endlines
endlines unix -r .

# Install gulp and build
npm install && ./node_modules/gulp/bin/gulp.js
