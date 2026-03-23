import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  "name": "rate-repository-app",
  "slug": "rate-repository-app",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "scheme": "raterepositoryapp",
  "userInterfaceStyle": "automatic",
  "newArchEnabled": false, 
  "ios": {
    "newArchEnabled": false,
    "supportsTablet": true
  },
  "android": {
    "newArchEnabled": false,
    "adaptiveIcon": {
      "backgroundColor": "#E6F4FE",
      "foregroundImage": "./assets/images/android-icon-foreground.png",
      "backgroundImage": "./assets/images/android-icon-background.png",
      "monochromeImage": "./assets/images/android-icon-monochrome.png"
    },
    "edgeToEdgeEnabled": true,
    "predictiveBackGestureEnabled": false
  },
  "web": {
    "bundler": "metro",
    "output": "single",
    "favicon": "./assets/images/favicon.png"
  },
  "plugins": [
    "expo-router",
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff",
        "dark": {
          "backgroundColor": "#000000"
        }
      }
    ]
  ],
  "experiments": {
    "typedRoutes": true,
    "reactCompiler": false 
  },
  extra: {
    env: process.env.ENV,
    apolloUri: process.env.APOLLO_URI,
  },
}