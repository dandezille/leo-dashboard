#!/bin/bash

# Get sudo
echo "$(whoami)"
[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# Pull latest updates
git pull --rebase --prune

# Update kiosk
pushd kiosk
bash ./update.sh
popd

# Update app
pushd app
bash ./update.sh
popd
