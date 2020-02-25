#!/bin/bash

if [[ "$cur_dir" == "scripts" ]]; then
  cd ..
fi

docker build -f Dockerfile.common -t wed-ds-common . \
&& ./DoComUtil build dev \
&& ./DoComUtil build prod
