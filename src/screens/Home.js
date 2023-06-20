import React from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, CommonActions} from '@react-navigation/native';

import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';

function Home({navigation}) {
  const functionLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        if (navigation.canGoBack()) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        }
      })
      .catch(error => {
        console.log('Error signing out:', error);
      });
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Welcome to GymStats</Text>

      <TouchableOpacity onPress={functionLogout}>
        <Text style={styles.loginButton}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const HomeScreen = ({navigation}) => <Home navigation={navigation} />;

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 28,
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

export default HomeScreen;
