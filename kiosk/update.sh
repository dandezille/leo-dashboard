#!/bin/bash

# Get sudo
echo "$(whoami)"
[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# Stop service if it is running
systemctl stop kiosk.service

# Correctly configure kiosk script path in service file
sed -i "/^ExecStart=/c\ExecStart=/bin/bash $(pwd)/kiosk.sh" kiosk.service 

# Link srevice file
systemctl link $(pwd)/kiosk.service

# Reload service daemon
systemctl daemon-reload

# Start kiosk service
systemctl start kiosk.service
