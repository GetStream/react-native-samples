import { Alert } from 'react-native';

export const notImplemented = () => {
  Alert.alert('This feature has not been implementd');
};

export const truncate = (input, length, end = '...') => {
  if (input.length > length) {
    return `${input.substring(0, length - end.length)}${end}`;
  }
  return input;
};

export const HEADER_HEIGHT = 55;
