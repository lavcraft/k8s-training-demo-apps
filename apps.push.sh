#!/bin/bash

set -o pipefail -e 
set -x
ROOTDIR=$(dirname $BASH_SOURCE)
source $ROOTDIR/.vars

docker push "${IMAGE_PREFIX}app-knife"
docker push "${IMAGE_PREFIX}app-butter"
