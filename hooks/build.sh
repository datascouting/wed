#!/bin/bash

echo "[***] Build hook running"

case "${COMMON_BUILD}" in
"true")
    echo "[***] Building the common image" \
     && docker build -f Dockerfile.common -t "${IMAGE_NAME}" .
  ;;
*)
  echo "[***] Pulling the common image" \
    && docker pull iordaniskostelidis/wed-common:latest \
    && echo "[***] Renaming the common image" \
    && docker tag iordaniskostelidis/wed-common:latest wed-ds-common:latest \
    && echo "[***] Building the production image" \
    && docker build -f Dockerfile.production -t "${IMAGE_NAME}" .
  ;;
esac
