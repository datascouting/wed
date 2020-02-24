#!/bin/bash

PUBLIC_PATH="/home/node/vhosts/public"

PUBLIC_LIBRARY_PATH=${PUBLIC_PATH}/lib \
&& PUBLIC_SCHEMAS_PATH=${PUBLIC_PATH}/schemas \
&& PUBLIC_REQUIREJS_CONFIG_FILE=${PUBLIC_PATH}/requirejs-config.js \
&& rm -fr ${PUBLIC_LIBRARY_PATH} || echo "Can't remove public library path" \
&& rm -fr ${PUBLIC_SCHEMAS_PATH} || echo "Can't remove public schemas path" \
&& rm -f ${PUBLIC_REQUIREJS_CONFIG_FILE} || echo "Can't remove public requrejs config file"
