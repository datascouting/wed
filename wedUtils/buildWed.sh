#!/bin/bash

chmod +x /home/node/wed/bin/wed-metadata \
&& cd /home/node/wed \
&& rm -fr /home/node/wed/build \
&& yarn install \
&& ./node_modules/gulp/bin/gulp.js
