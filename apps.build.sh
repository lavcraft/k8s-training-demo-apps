#!/bin/bash

set -o pipefail -e 
set -x
ROOTDIR=$(dirname $BASH_SOURCE)
source $ROOTDIR/.vars

docker build --tag "${DOCKER_IMAGE_PREFIX}app-knife" --build-arg BASE_IMAGE="${DOCKER_IMAGE_BASE:-node:16}" $ROOTDIR/app-knife/
docker build --tag "${DOCKER_IMAGE_PREFIX}app-butter" --build-arg BASE_IMAGE="${DOCKER_IMAGE_BASE:-node:16}" $ROOTDIR/app-butter/
