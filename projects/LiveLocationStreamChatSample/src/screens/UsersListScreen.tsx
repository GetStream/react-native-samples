import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {usersWithToken} from '../data/usersWithToken';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useAppContext} from '../common/AppContext';

export const UsersListScreen = () => {
  const {setUserWithToken} = useAppContext();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.chooseText}>Select User</Text>
        {usersWithToken.map(user => {
          return (
            <Pressable
              style={styles.user}
              key={user.id}
              onPress={() => setUserWithToken(user)}>
              <Image source={{uri: user.image}} style={styles.avatar} />
              <Text style={styles.name}>{user.name}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  chooseText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 16,
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  name: {
    marginLeft: 20,
    fontSize: 18,
  },
  arrow: {
    fontSize: 25,
    position: 'absolute',
    right: 20,
  },
});
