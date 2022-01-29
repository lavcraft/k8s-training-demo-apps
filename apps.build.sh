#!/bin/bash

set -o pipefail -e 
set -x
ROOTDIR=$(dirname $BASH_SOURCE)
source $ROOTDIR/.vars

docker build --tag "${IMAGE_PREFIX}app-knife" --build-arg DOCKER_BASE_IMAGE="${DOCKER_BASE_IMAGE:-node:16}" $ROOTDIR/app-knife/
docker build --tag "${IMAGE_PREFIX}app-butter" --build-arg DOCKER_BASE_IMAGE="${DOCKER_BASE_IMAGE:-node:16}" $ROOTDIR/app-butter/
