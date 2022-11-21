# WhatsApp Clone Using React Native And Stream Chat

![1280x640px-2](https://user-images.githubusercontent.com/25864161/166482441-e92ad7cf-8705-42b5-ae83-878cc60b4ebd.jpg)


The WhatsApp Clone is an app implemented using Stream Chat and React Native. 
It is a fully fledged messaging app built using core packages.

> ⚠️ Please don't simply copy-paste the code in your project. 
> This repository contains projects that are aiming to demonstrate the power of Stream's Chat API and SDK in combination with React Native. This project should not be used as source for ready to publish application.

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
cd react-native-samples/projects/WhatsAppClone
```

**Install package dependencies:**

```bash
# Install npm dependencies
yarn

# Install pod dependencies
npx pod-install
```

## Generate Test Users and Chat Data

- Create a new app by [registering](https://getstream.io/chat/trial/) or use an existing app, if you have already.
- Set your `api key` and `api secret` in `test-data-cli.config.js` file.
- Run the following command:

```sh
yarn seed-chat
```

- The output of this command will include bunch of user ids and their respective token. You can copy-paste any one of the listed user id & token to `.env` file (as mentioned in next section)

## Set Environment variables

- Create an .env file in root folder of the WhatsAppClone project:

```sh
touch .env
```

- Fill all environment variables in `.env` file after pasting this content:

```
STREAM_API_KEY=""
STREAM_USER_ID=""
STREAM_USER_TOKEN=""
```

- You can find all users ids and tokens in a table that was printend after you ran the `seed-chat` command.

**Run the project on your device or emulator:**

```bash
npx react-native run-ios # for iOS
npx react-native run-android # for android
```

## App configuration
To enjoy an app that resembles WhatsApp we will need to configure our app correctly via Stream's [dashboard](https://dashboard.getstream.io/)
Follow the next steps to ensure WhatsApp's behaviour.

### Disabling Threads

- Go to your application [dashboard](https://dashboard.getstream.io/)
- Select the relevant application
- In the left menu select Channel Types section, select messaging
- Toggle off Threads & Replies

### Enable Pinning

- Go to your application [dashboard](https://dashboard.getstream.io/)
- Select the relevant application
- In the left menu select Channel Types section, select messaging
- Scroll to the Permissions Configuration section and enable pinning messages by editing the configuration.
- Add the resource `PinMessage` to the `resources` array in an item with the relevant `action` and `roles`. 

- Your Configuration item should resemble this:
```json
{
    "action": "Allow",
    "name": "Channel member permissions",
    "resources": [
        "ReadChannel",
        "CreateChannel",
        "CreateMessage",
        "UploadAttachment",
        "UseCommands",
        "AddLinks",
        "RunMessageAction",
        "CreateReaction",
        "UpdateChannelFrozen",
        "UpdateChannelCooldown",
        "SkipChannelCooldown",
        "PinMessage"
    ],
    "roles": [
        "channel_member",
        "channel_moderator"
    ],
    "owner": false,
    "priority": 70
}
```

### Future Thoughts/Features

- Channel pinning in channel list screen
- Real visualization of sound wave in voice messages
- Emoji keyboard support
- Transition animations in several components/buttons
- Video and/or voice call support
- Consider date-fns over Moment JS (became legacy)


### Issues
~~1. Crash on android when playing audio message~~
2. navigaton to channel list screen is going to previous clicked channel
3. 
