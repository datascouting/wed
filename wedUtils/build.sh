#!/bin/bash

fixWedMetadata \
&& cd /home/node/wed \
&& rm -fr /home/node/wed/build \
&& yarn install \
&& ./node_modules/gulp/bin/gulp.js
