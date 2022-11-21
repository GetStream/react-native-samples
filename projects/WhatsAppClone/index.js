/**
 * @format
 */

import 'react-native-gesture-handler'
import {AppRegistry, LogBox} from 'react-native'
import {name as appName} from './app.json'
import App from './src/App'

LogBox.ignoreLogs([
  'Video library is currently not installed. To allow in-app video playback, install the "react-native-video" package.',
])

AppRegistry.registerComponent(appName, () => App)
