import type {DeepPartial, Theme} from 'stream-chat-react-native';

const IOS_GREEN = '#53d769';

export const theme: DeepPartial<Theme> = {
  colors: {
    ios_green: IOS_GREEN,
    accent_blue: '#005FFF',
    accent_green: '#20E070',
    accent_red: '#FF3742',
    bg_gradient_end: '#101214',
    bg_gradient_start: '#070A0D',
    black: '#FFFFFF',
    blue_alice: '#00193D',
    border: '#141924',
    grey: '#7A7A7A',
    grey_gainsboro: '#2D2F2F',
    grey_whisper: '#1C1E22',
    icon_background: '#FFFFFF',
    modal_shadow: '#000000',
    overlay: '#FFFFFFCC', // CC = 80% opacity
    shadow_icon: '#00000080', // 80 = 50% opacity
    targetedMessageBackground: '#302D22',
    transparent: 'transparent',
    white: '#101418',
    white_smoke: '#13151B',
    white_snow: '#070A0D',
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
