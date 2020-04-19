#!/bin/bash

echo "Updating dashboard at $(date)"

# Pull latest updates
ORIGINAL_SHA=$(git rev-parse HEAD)
git pull --rebase --prune
NEW_SHA=$(git rev-parse HEAD)

echo Original SHA $ORIGINAL_SHA
echo New SHA      $NEW_SHA

# Update running code if new changes
if [ "$ORIGINAL_SHA" = "$NEW_SHA" ]; then
  echo SHAs match, no update required
else
  echo SHAs different, update

  # Update app
  pushd app
  bash ./update.sh
  popd

  # Update kiosk
  pushd kiosk
  bash ./update.sh
  popd

  echo Update complete
fi  # end if SHA compare

