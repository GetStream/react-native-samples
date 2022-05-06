import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import {LogBox, TextInput} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {OverlayProvider, ThemeProvider} from 'stream-chat-react-native'
import {chatClient, user, userToken} from './client'
import {theme} from './theme'
import 'moment/min/moment-with-locales'
import 'moment/min/locales'
import {ChannelPreviewMessengerProps} from 'stream-chat-react-native-core/src/components/ChannelPreview/ChannelPreviewMessenger'
import RootStack from './stacks/RootStack'
import {useSharedValue} from 'react-native-reanimated'

LogBox.ignoreAllLogs(true)

export type StreamChannel = ChannelPreviewMessengerProps['channel'] | undefined
export type StreamChannelId = string | undefined
export type StreamMessageId = string | undefined

type AppContextType = {
  messageInputRef: RefObject<TextInput> | null
  channel: StreamChannel
  setChannel: Dispatch<SetStateAction<StreamChannel>>
  selectedChannelsForEditing: StreamChannel[]
  setSelectedChannelsForEditing: Dispatch<SetStateAction<StreamChannel[]>>
  selectedMessageIdsEditing: StreamMessageId[]
  setSelectedMessageIdsEditing: Dispatch<SetStateAction<StreamMessageId[]>>
}
// @ts-ignore
export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType,
)

const App = () => {
  const messageInputRef = useRef<TextInput>(null)
  const [channel, setChannel] = useState<StreamChannel>()
  const [clientReady, setClientReady] = useState<boolean>(false)
  const [selectedChannelsForEditing, setSelectedChannelsForEditing] = useState<
    StreamChannel[]
  >([])
  const [selectedMessageIdsEditing, setSelectedMessageIdsEditing] = useState<
    StreamMessageId[]
  >([])
  const {bottom} = useSafeAreaInsets()
  const overlayOpacity = useSharedValue(0)

  useEffect(() => {
    const setupClient = async () => {
      await chatClient.connectUser(user, userToken)

      setClientReady(true)
    }

    setupClient()
  }, [])

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          messageInputRef,
          channel,
          setChannel,
          selectedChannelsForEditing,
          setSelectedChannelsForEditing,
          selectedMessageIdsEditing,
          setSelectedMessageIdsEditing,
        }}>
        <OverlayProvider bottomInset={bottom} value={{style: theme}}>
          <ThemeProvider style={theme}>
            <RootStack clientReady={clientReady} />
          </ThemeProvider>
        </OverlayProvider>
      </AppContext.Provider>
    </NavigationContainer>
  )
}

export const noHeaderOptions = {
  headerShown: false,
}

export default () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  )
}
