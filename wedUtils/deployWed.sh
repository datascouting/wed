#!/bin/bash

BUILD_PATH=/home/node/wed/build
PUBLIC_PATH="/home/node/vhosts/public"

cleanWed \
&& cp -r ${BUILD_PATH}/packed/* ${PUBLIC_PATH} \
&& cp -r ${BUILD_PATH}/schemas ${PUBLIC_PATH} \
&& rm ${PUBLIC_PATH}/kitchen-sink.html \
&& rm ${PUBLIC_PATH}/lib/kitchen-sink.js
