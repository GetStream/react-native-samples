import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import {TextInput} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'
import {Chat, OverlayProvider, ThemeProvider} from 'stream-chat-react-native'
import {chatClient, user, userToken} from './client'
import {colors, theme} from './theme'
import 'moment/min/moment-with-locales'
import 'moment/min/locales'
import {ChannelPreviewMessengerProps} from 'stream-chat-react-native-core/src/components/ChannelPreview/ChannelPreviewMessenger'
import RootStack from './stacks/RootStack'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export type StreamChannel = ChannelPreviewMessengerProps['channel'] | undefined
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

export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType,
)
export const useAppContext = () => React.useContext(AppContext)

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

  useEffect(() => {
    const setupClient = async () => {
      const connectPromise = chatClient.connectUser(user, userToken)
      setClientReady(true)
      await connectPromise
    }

    setupClient()
  }, [])

  return (
    <NavigationContainer theme={{colors: {background: colors.dark.background}}}>
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
        <GestureHandlerRootView style={{flex: 1}}>
          <OverlayProvider bottomInset={bottom} value={{style: theme}}>
            <ThemeProvider style={theme}>
              <Chat client={chatClient} enableOfflineSupport>
                <RootStack clientReady={clientReady} />
              </Chat>
            </ThemeProvider>
          </OverlayProvider>
        </GestureHandlerRootView>
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
