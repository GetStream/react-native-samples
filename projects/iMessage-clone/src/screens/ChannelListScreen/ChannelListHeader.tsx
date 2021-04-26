import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  Search,
  useTheme,
  CircleClose,
  RootSvg,
  RootPath,
  IconProps,
} from 'stream-chat-react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchContext} from '../../contexts/SearchContext';

export const Compose: React.FC<IconProps> = props => (
  <RootSvg {...props} viewBox="0 0 24 24">
    <RootPath
      d="M19.396 4.82666L19.9937 4.2124C20.2759 3.92188 20.2842 3.51514 20.002 3.24121L19.811 3.04199C19.5537 2.78467 19.1387 2.81787 18.873 3.0835L18.2671 3.68115L19.396 4.82666ZM9.8418 13.4595L11.4604 12.7539L18.7817 5.43262L17.6445 4.31201L10.3315 11.6333L9.58447 13.1938C9.51807 13.335 9.68408 13.5259 9.8418 13.4595ZM6.39697 19.6353H16.1421C17.6279 19.6353 18.4995 18.772 18.4995 17.062V7.82324L17.1631 9.15967V16.9956C17.1631 17.8589 16.6899 18.2988 16.1172 18.2988H6.41357C5.5835 18.2988 5.12695 17.8589 5.12695 16.9956V7.57422C5.12695 6.71094 5.5835 6.2627 6.41357 6.2627H13.5938L14.9302 4.92627H6.39697C4.66211 4.92627 3.79053 5.78955 3.79053 7.49951V17.062C3.79053 18.7803 4.66211 19.6353 6.39697 19.6353Z"
      {...props}
    />
  </RootSvg>
);

export const CHANNEL_LIST_SCREEN_HEADER_HEIGHT = 120;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 38,
  },
  searchContainer: {
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    includeFontPadding: false, // for android vertical text centering
    padding: 0, // removal of default text input padding on android
    paddingHorizontal: 10,
    paddingTop: 0, // removal of iOS top padding for weird centering
    textAlignVertical: 'center', // for android vertical text centering
  },
});

export const ChannelListHeader = () => {
  const {
    theme: {
      colors: {black, grey, grey_whisper, white_snow, accent_blue},
    },
  } = useTheme();

  const navigation = useNavigation();

  const {
    searchInputRef,
    searchInputText,
    setSearchInputText,
    setSearchQuery,
    reset,
  } = useContext(SearchContext);

  return (
    <>
      <View style={[styles.container, {backgroundColor: white_snow}]}>
        <View style={[styles.flex]}>
          <View style={[styles.headerContainer]}>
            <Text style={[styles.titleText]}>Messages</Text>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('NewMessage')}>
              <Compose height={30} width={30} pathFill={accent_blue} />
            </TouchableWithoutFeedback>
          </View>

          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: grey_whisper,
                borderColor: grey_whisper,
              },
            ]}>
            <Search width={18} pathFill={grey} />
            <TextInput
              onChangeText={text => {
                setSearchInputText(text);
                if (!text) {
                  reset();
                  setSearchQuery('');
                }
              }}
              onSubmitEditing={({nativeEvent: {text}}) => {
                setSearchQuery(text);
              }}
              placeholder="Search"
              placeholderTextColor={grey}
              ref={searchInputRef}
              returnKeyType="search"
              style={[styles.searchInput, {color: black}]}
              value={searchInputText}
            />
            {!!searchInputText && (
              <TouchableOpacity
                onPress={() => {
                  setSearchInputText('');
                  setSearchQuery('');
                  searchInputRef.current?.blur();
                  reset();
                }}>
                <CircleClose pathFill={grey} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
