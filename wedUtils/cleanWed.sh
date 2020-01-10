#!/bin/bash

DEPLOY_PATH_LIB=/home/user/vhosts/public/lib
DEPLOY_PATH_SCHEMA=/home/user/vhosts/public/schemas
DEPLOY_REQUIREJS_CONFIG=/home/user/vhosts/public/requirejs-config.js

rm -fr ${DEPLOY_PATH_LIB} || echo "Can't remove"
rm -fr ${DEPLOY_PATH_SCHEMA} || echo "Can't remove"
rm -f ${DEPLOY_REQUIREJS_CONFIG} || echo "Can't remove"