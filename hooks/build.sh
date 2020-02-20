#!/bin/bash

echo "[***] Build hook running"

echo "[***] Build common image"
docker build -f Dockerfile.common -t wed-ds-common:latest .

echo "[***] Build release image"
docker build -f Dockerfile.production -t "${IMAGE_NAME}" .
