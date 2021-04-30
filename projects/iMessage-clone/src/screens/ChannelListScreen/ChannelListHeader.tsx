import React, {useContext, useCallback} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Search, useTheme, CircleClose} from 'stream-chat-react-native';
import {useNavigation} from '@react-navigation/native';

import {SearchContext} from '../../contexts/SearchContext';
import {Compose} from '../../icons';

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

  const onChangeText = useCallback(
    text => {
      setSearchInputText(text);
      if (!text) {
        reset();
        setSearchQuery('');
      }
    },
    [reset, setSearchInputText, setSearchQuery],
  );

  const onSubmitEditing = useCallback(
    ({nativeEvent: {text}}) => {
      setSearchQuery(text);
    },
    [setSearchQuery],
  );

  const onClearInputText = useCallback(() => {
    setSearchInputText('');
    setSearchQuery('');
    searchInputRef.current?.blur();
    reset();
  }, [reset, searchInputRef, setSearchInputText, setSearchQuery]);

  const onClickNewMessage = useCallback(
    () => navigation.navigate('NewMessage'),
    [navigation],
  );

  return (
    <>
      <View style={[styles.container, {backgroundColor: white_snow}]}>
        <View style={[styles.flex]}>
          <View style={[styles.headerContainer]}>
            <Text style={[styles.titleText]}>Messages</Text>
            <TouchableWithoutFeedback onPress={onClickNewMessage}>
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
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              placeholder="Search"
              placeholderTextColor={grey}
              ref={searchInputRef}
              returnKeyType="search"
              style={[styles.searchInput, {color: black}]}
              value={searchInputText}
            />
            {!!searchInputText && (
              <TouchableOpacity onPress={onClearInputText}>
                <CircleClose pathFill={grey} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </>
  );
};
