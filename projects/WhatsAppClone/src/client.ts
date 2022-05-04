import {StreamChat} from 'stream-chat'
import {ChatContextValue} from 'stream-chat-react-native-core/lib/typescript/contexts/chatContext/ChatContext'
import {STREAM_API_KEY, STREAM_USER_TOKEN, STREAM_USER_ID} from '@env'

export const chatClient = StreamChat.getInstance(
  STREAM_API_KEY,
) as unknown as ChatContextValue['client']
export const userToken = STREAM_USER_TOKEN
export const user = {
  id: STREAM_USER_ID,
}
