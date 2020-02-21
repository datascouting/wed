#!/bin/bash

cleanWed

cp -r /home/node/wed/build/packed/* /home/node/vhosts/public/
cp -r /home/node/wed/build/schemas /home/node/vhosts/public/

rm /home/node/vhosts/public/kitchen-sink.html
rm /home/node/vhosts/public/lib/kitchen-sink.js
