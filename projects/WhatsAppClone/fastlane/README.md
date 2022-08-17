fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### match_me

```sh
[bundle exec] fastlane match_me
```

Installs all Certs and Profiles necessary for ad-hoc

### match_appstore

```sh
[bundle exec] fastlane match_appstore
```

Installs all Certs and Profiles necessary for appstore

----


## iOS

### ios deploy_to_firebase

```sh
[bundle exec] fastlane ios deploy_to_firebase
```

Deploy iOS build to Firebase

### ios deploy_to_testflight

```sh
[bundle exec] fastlane ios deploy_to_testflight
```

Deploy iOS build to TestFlight

----


## Android

### android deploy_to_firebase

```sh
[bundle exec] fastlane android deploy_to_firebase
```

Deploy Android build to Firebase

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
