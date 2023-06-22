import React, {useState, Route, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CommonActions} from '@react-navigation/native';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  Alert,
  View,
} from 'react-native';

function Settings({navigation}) {
  const user = auth().currentUser;

  const functionLogout = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => signOut(),
        },
      ],
      {cancelable: false},
    );
  };

  function signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => {
        console.log('Error signing out:', error);
      });
  }

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Settings</Text>
      <Text style={styles.user}>
        Signed in as:{'\n'}
        {user.email}
      </Text>
      <TouchableOpacity onPress={functionLogout}>
        <Text style={styles.signOutButton}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 28,
    textAlign: 'center',
  },
  user: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 18,
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#890000',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 20,
    borderRadius: 8,
    marginTop: 24,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
});

export default Settings;
