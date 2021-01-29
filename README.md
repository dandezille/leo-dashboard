![CI](https://github.com/dandezille/family-dashboard/workflows/CI/badge.svg)

# Family Dashboard

## Setup

- Download latest [Raspbian release](https://www.raspberrypi.org/downloads/raspbian/)
- Follow the [installation instructions](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md).
- [Enable ssh](https://www.raspberrypi.org/documentation/remote-access/ssh/) by creating a file named `ssh` into the boot partition. EXAMPLE
- [Enable WiFi](https://www.raspberrypi.org/documentation/configuration/wireless/headless.md) by creating a file called `wpa_supplicant.conf` with contents below.
- Boot and find the pi's IP address (or default hostname raspberrypi?)
- Connect via SSH using pi/raspberry
- Set new password for pi user (passwd)
- Set hostname `sudo raspi-config nonint do_hostname <NEW_HOSTNAME>`
- Install lightdm `sudo apt update && sudo apt-get install lightdm`
- Enable autologin `sudo raspi-config->3->B1->B4`
- Reboot
- Copy ssh key by `ssh-copy-id pi@HOSTNAME`
- Run `deploy machine`
- Copy ssh public key and add to GitHub account
- Run `deploy app`

### wpa_supplicant.conf

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=<Insert 2 letter ISO 3166-1 country code here>

network={
 ssid="<Name of your wireless LAN>"
 psk="<Password for your wireless LAN>"
}
```

## Frontent

Frontent is implemented in React and Typescript. Run `yarn start` to live develop and `yarn test` to run tests.

## Deployment

Run `deploy machine` to setup pi with required dependencies and setup kiosk configuration. Once done, run `deploy app` to deploy the latest GitHub master branch to the pi.
