#!/bin/bash

echo "$(whoami)"
[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

systemctl link $(pwd)/kiosk.service
systemctl daemon-reload
systemctl start kiosk.service
