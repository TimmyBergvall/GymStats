import * as React from 'react';
import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';


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

function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const functionLogin = () => {
    try {
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Welcome to GymStats</Text>

      <TextInput
        style={styles.inputText}
        placeholder="Username"
        onChangeText={username => setUsername(username)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />

      <TouchableOpacity onPress={functionLogin}>
        <Text style={styles.loginButton}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            color: 'lightblue',
            textAlign: 'center',
          }}>
          No account?
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 100,
    marginBottom: 64,
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
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 40,
  },
});

export default Login;
