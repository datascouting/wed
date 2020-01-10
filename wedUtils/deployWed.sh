#!/bin/bash

cleanWed

cp -r /home/user/wed/build/packed/* /home/user/vhosts/public/
cp -r /home/user/wed/build/schemas /home/user/vhosts/public/

rm /home/user/vhosts/public/kitchen-sink.html
rm /home/user/vhosts/public/lib/kitchen-sink.js
