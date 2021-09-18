# Gamepad widget

# WARNING!
You can potentially damage your machine by using this widget. Project is still experimental.

# Installation

### Using github pages

Add mount point to `.cncrc` file
```json
{
  ...
  "mountPoints": [
    {
      "route": "/gamepad",
      "target": "https://uglydonkey.github.io/cncjs-widget-gamepad/"
    }
  ]
}
```
Widget on github pages is always up-to-date

Add custom widget with URL `/gamepad`

### Using local drive

Clone branch `gh-pages` with command
```shell
git clone -b gh-pages https://github.com/UglyDonkey/cncjs-widget-gamepad.git
```
To update widget just pull repository with command
```shell
git pull origin gh-pages
```

Add mount point to `.cncrc` file
```json
{
  ...
  "mountPoints": [
    {
      "route": "/gamepad",
      "target": "~/cncjs-widget-gamepad" # replace with your path
    }
  ]
}
```
Add custom widget with URL `/gamepad`
