#!/bin/bash

DEPLOY_PATH_LIB=/home/node/vhosts/public/lib
DEPLOY_PATH_SCHEMA=/home/node/vhosts/public/schemas
DEPLOY_REQUIREJS_CONFIG=/home/node/vhosts/public/requirejs-config.js

rm -fr ${DEPLOY_PATH_LIB} || echo "Can't remove"
rm -fr ${DEPLOY_PATH_SCHEMA} || echo "Can't remove"
rm -f ${DEPLOY_REQUIREJS_CONFIG} || echo "Can't remove"