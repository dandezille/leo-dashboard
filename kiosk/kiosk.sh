#!/bin/bash

xset s noblank  # Don't blank screensaver
xset s off      # Disable screensaver
xset -dpms      # Disable display power management

# Hide cursor when idle
unclutter -idle 0.5 -root &

# Clear preferences which would show a warning bar
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

# Start browser
/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:8000 #&

# Refresh every 15 seconds
# while true; do
#       xdotool keydown ctrl+r; xdotool keyup ctrl+r;
#       sleep 15
# done
