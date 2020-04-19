#!/bin/bash

echo "$(whoami)"
[ "$UID" -eq 0 ] || exec sudo "$0" "$@"

systemctl stop kiosk.service

sed -i "/^ExecStart=/c\ExecStart=/bin/bash /home/pi/leo-dashboard/kiosk/kiosk.sh" kiosk.service 

systemctl link $(pwd)/kiosk.service
systemctl daemon-reload
systemctl start kiosk.service
