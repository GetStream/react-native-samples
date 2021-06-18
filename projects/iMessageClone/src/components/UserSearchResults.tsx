import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
import {useTheme, vw, Search} from 'stream-chat-react-native';

import {useNewMessageContext} from '../contexts/NewMessageContext';

import type {UserResponse} from 'stream-chat';

const styles = StyleSheet.create({
  absolute: {position: 'absolute'},
  emptyResultIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },
  emptyResultIndicatorText: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },
  flex: {flex: 1},
  gradient: {
    height: 24,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  matches: {fontSize: 12},
  searchResultContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 16,
    paddingVertical: 12,
  },
  searchResultUserDetails: {
    flex: 1,
    paddingLeft: 8,
  },
  searchResultUserLastOnline: {fontSize: 12},
  searchResultUserName: {fontSize: 14, fontWeight: '700'},
  sectionHeader: {
    fontSize: 14.5,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});

type UserSearchResultsProps = {
  groupedAlphabetically?: boolean;
  removeOnPressOnly?: boolean;
  results?: UserResponse[];
  showOnlineStatus?: boolean;
  toggleSelectedUser?: (user: UserResponse) => void;
};

export const UserSearchResults: React.FC<UserSearchResultsProps> = ({
  groupedAlphabetically = true,
  results: resultsProp,
  toggleSelectedUser,
}) => {
  const {
    loading,
    loadMore,
    results: resultsContext,
    searchText,
    toggleUser,
  } = useNewMessageContext();
  const [sections, setSections] = useState<
    Array<{
      data: UserResponse[];
      title: string;
    }>
  >([]);
  const {
    theme: {
      colors: {
        bg_gradient_end,
        bg_gradient_start,
        black,
        border,
        grey,
        grey_gainsboro,
        white_smoke,
        white_snow,
      },
    },
  } = useTheme();

  const results = resultsProp || resultsContext;
  const resultsLength = results.length;
  useEffect(() => {
    const newSections: {
      [key: string]: {
        data: UserResponse[];
        title: string;
      };
    } = {};

    results.forEach(user => {
      const initial = user.name?.slice(0, 1).toUpperCase();

      if (!initial) return;

      if (!newSections[initial]) {
        newSections[initial] = {
          data: [user],
          title: initial,
        };
      } else {
        newSections[initial].data.push(user);
      }
    });
    setSections(Object.values(newSections));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultsLength]);

  return (
    <View style={[styles.flex, {backgroundColor: white_snow}]}>
      {groupedAlphabetically && sections.length > 0 && (
        <View style={searchText ? styles.gradient : undefined}>
          <Svg height={24} style={styles.absolute} width={vw(100)}>
            <Rect
              fill="url(#gradient)"
              height={24}
              width={vw(100)}
              x={0}
              y={0}
            />
            <Defs>
              <LinearGradient
                gradientUnits="userSpaceOnUse"
                id="gradient"
                x1={0}
                x2={0}
                y1={0}
                y2={24}>
                <Stop
                  offset={1}
                  stopColor={bg_gradient_start}
                  stopOpacity={1}
                />
                <Stop offset={0} stopColor={bg_gradient_end} stopOpacity={1} />
              </LinearGradient>
            </Defs>
          </Svg>
          {searchText ? (
            <Text
              style={[
                styles.matches,
                {
                  color: grey,
                },
              ]}>
              {`Matches for "${searchText}"`}
            </Text>
          ) : null}
        </View>
      )}
      {loading && (!results || results.length === 0) && searchText === '' ? (
        <ActivityIndicator size="small" />
      ) : (
        <SectionList
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={() => (
            <View style={styles.emptyResultIndicator}>
              <Search fill={grey_gainsboro} scale={5} />
              <Text style={[{color: grey}, styles.emptyResultIndicatorText]}>
                {loading ? 'Loading...' : 'No user matches these keywords...'}
              </Text>
            </View>
          )}
          onEndReached={loadMore}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                if (toggleSelectedUser) {
                  toggleSelectedUser(item);
                } else {
                  toggleUser(item);
                }
              }}
              style={[
                styles.searchResultContainer,
                {
                  backgroundColor: white_snow,
                  borderBottomColor: border,
                },
              ]}>
              <View style={styles.searchResultUserDetails}>
                <Text
                  style={[
                    styles.searchResultUserName,
                    {
                      color: black,
                    },
                  ]}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => {
            if (searchText || !groupedAlphabetically) {
              return null;
            }

            return (
              <Text
                key={title}
                style={[
                  styles.sectionHeader,
                  {
                    backgroundColor: white_smoke,
                    color: grey,
                  },
                ]}>
                {title}
              </Text>
            );
          }}
          sections={sections}
          stickySectionHeadersEnabled
        />
      )}
    </View>
  );
};
