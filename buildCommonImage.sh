#!/bin/bash

docker build \
 -f ./Dockerfile.common \
 -t wed-ds-common:latest \
 .