# anwin

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "/Users/dimakunitski/Documents/anwin",
  "type": [
    "cordova",
    "web"
  ],
  "name": "anwin",
  "framework": "core",
  "template": "single-view",
  "bundler": false,
  "cssPreProcessor": false,
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkTheme": false,
    "iconFonts": true,
    "fillBars": false
  },
  "customBuild": false,
  "pkg": "com.example.anwin",
  "cordova": {
    "folder": "cordova",
    "platforms": [
      "ios"
    ],
    "plugins": [
      "cordova-plugin-statusbar",
      "cordova-plugin-keyboard",
      "cordova-plugin-splashscreen",
      "cordova-plugin-safariviewcontroller",
      "cordova-plugin-file",
      "cordova-plugin-inappbrowser"
    ]
  }
}
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `serve` - run development server
* 📱 `build-cordova` - build cordova app
## Cordova

Cordova project located in `cordova` folder. You shouldn't modify content of `cordova/www` folder. Its content will be correctly generated when you call `npm run cordova-build-prod`.



## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 generate-assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 generate-assets --ui
```

## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)



* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on patreon:
https://patreon.com/vladimirkharlampidi