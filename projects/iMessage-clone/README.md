# iMessage Clone

![](https://user-images.githubusercontent.com/18744505/116022826-53809780-a621-11eb-97ef-9d13eb8d0e07.jpg)

iMessage Clone is a sample app implemented using Stream Chat and React Native. It is a fully fledged messaging app built using core packages.

## Getting Started

Before running this project please ensure React Native is installed and configured on your machine. If you're new to Flutter, please checkout the [official guide](https://reactnative.dev/docs/environment-setup) with installation instructions for your OS. 

 

This project is only configured to support the following platforms:

- Android
- iOS

Web and Desktop are not supported at this time. 

After installing React Native and the necessary toolchain for your device (Android or iOS), connect your device or open your emulator before running the following:

**Clone the repo**

```bash
git clone https://github.com/GetStream/react-native-samples
```

**Open the app folder** 

```bash
cd react-native-samples/iMessage-clone
```

**Install package dependencies:**

```bash
# Install npm dependencies
yarn

# Link the assets

npx react-native link

# Install pod dependencies
npx pod-install
```

**Run the project on your device or emulator:**

```bash
npx react-native run-ios
```

## Environment variables & Setting up mocked data

- Create a new app in [our dashboard](https://dashboard.getstream.io/dashboard)
- Create a `.env` file and add the app `key` as `STREAM_API_KEY`
- Follow the [setup guide](https://github.com/GetStream/stream-chat-test-data-cli#-setup) of our `test data cli`, but instead of `cp config.js.template dev.config.js`, use `cp react-native.config.js.template dev.config.js`
- Run `create-channels` in order to generate initial data
- [Generate a user token](https://getstream.io/chat/docs/react-native/token_generator) and add it to the `.env` as `STREAM_USER_TOKEN`