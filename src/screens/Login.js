import * as React from 'react';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    if (auth().currentUser) {
      navigation.navigate('SignedIn');
    }
  }, []);

  const functionLogin = () => {
    if (email === '') {
      ToastAndroid.show('Please enter an email', ToastAndroid.SHORT);
      return;
    }

    if (reg.test(email) === false) {
      ToastAndroid.show('The email-format is not valid', ToastAndroid.SHORT);
      return;
    }

    if (password.length === 0) {
      ToastAndroid.show('Please enter your password', ToastAndroid.SHORT);
      return;
    }

    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            ToastAndroid.show(
              'That email address is invalid!',
              ToastAndroid.SHORT,
            );
          }
          ToastAndroid.show('Wrong email or password', ToastAndroid.SHORT);
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
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Password"
        autoCapitalize="none"
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
    marginTop: 80,
    marginBottom: 64,
    fontSize: 28,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#276B7F',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 20,
    borderRadius: 10,
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
