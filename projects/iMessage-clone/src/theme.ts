import type {DeepPartial, Theme} from 'stream-chat-react-native';

const IOS_GREEN = '#53d769';

export const theme: DeepPartial<Theme> = {
  colors: {
    ios_green: IOS_GREEN,
  },
  messageSimple: {
    content: {
      containerInner: {
        backgroundColor: '#e6e6e6',
        borderColor: '#e6e6e6',
      },
    },
  },
};

export const myMessageTheme: DeepPartial<Theme> = {
  messageSimple: {
    content: {
      containerInner: {
        backgroundColor: IOS_GREEN,
        borderColor: IOS_GREEN,
      },
      markdown: {
        text: {
          color: '#FCFCFC',
        },
      },
    },
  },
};
