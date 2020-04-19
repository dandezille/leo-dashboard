#!/bin/bash

# Get sudo
echo "$(whoami)"
[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

# Stop service if it is running
systemctl stop dashboard-app.service

# Correctly configure kiosk script path in service file
sed -i "/^ExecStart=/c\ExecStart=/bin/bash $(pwd)/start.sh" dashboard-app.service 

# Link srevice file
systemctl link $(pwd)/dashboard-app.service

# Reload service daemon
systemctl daemon-reload

# Start kiosk service
systemctl start dashboard-app.service
