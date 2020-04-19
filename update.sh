#!/bin/bash

# Get sudo
echo "$(whoami)"
[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# Update kiosk
pushd kiosk
bash ./update.sh
popd

# Update app
pushd app
bash ./update.sh
popd
