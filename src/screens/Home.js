import React, {useState, Route} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

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
  View,
} from 'react-native';

function Home({navigation}) {
  const user = auth().currentUser;

  const functionLogout = () => {
    auth()
      .signOut()
      .then(() => 
      console.log('User signed out!'));

    navigation.navigate('Login');
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Welcome to GymStats</Text>
      <Text style={styles.user}>{user.email}</Text>
      <TouchableOpacity onPress={functionLogout}>
        <Text style={styles.loginButton}>Logout</Text>
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
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#276B7F',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 20,
    borderRadius: 25,
    marginTop: 24,
  },
});

export default Home;
