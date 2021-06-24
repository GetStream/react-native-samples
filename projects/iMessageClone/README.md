# iMessage Clone

![](https://user-images.githubusercontent.com/18744505/116126112-a21f4780-a69c-11eb-8d03-dbfc174d04aa.jpg)

iMessage Clone is a sample app implemented using Stream Chat and React Native. It is a fully fledged messaging app built using core packages.

> ⚠️  Please don't simply copy-paste the code in your project. Projects in this repository are just the demostrations for power of Stream Chat and React Native, and should not be used as source for ready to publish application.

## Getting Started

Before running this project please ensure React Native is installed and configured on your machine. If you're new to React Native, please checkout the [official guide](https://reactnative.dev/docs/environment-setup) with installation instructions for your OS. 

 

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
cd react-native-samples/iMessageClone
```

**Install package dependencies:**

```bash
# Install npm dependencies
yarn

# Install pod dependencies
npx pod-install
```

**Run the project on your device or emulator:**

```bash
npx react-native run-ios
```

## Environment variables

- Create an .env file in root folder of this project:

```sh
touch .env
```
- And set following environment variables in `.env` file.

- `STREAM_API_KEY`
- `STREAM_USER_ID`
- `STREAM_USER_TOKEN`

## Generate Test Users and Chat Data

- Create a new app in [our dashboard](https://dashboard.getstream.io/dashboard) (or use existing one if you have already)
- Set your `api key` and `api secret` in `test-data-cli.config.js` file.
- Run the following command:

```sh
yarn create-channels --config="test-data-cli.config.js"
```
- The output of this command will include bunch of user ids and their respective token. You can copy-paste any of the listed user id & token to .env file.
