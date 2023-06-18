import React, {useState, Route} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

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

function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const functionRegister = () => {
    if (email === '') {
      ToastAndroid.show('Please enter an email', ToastAndroid.SHORT);
      return;
    }

    if (reg.test(email) === false) {
      ToastAndroid.show('Please enter a valid email', ToastAndroid.SHORT);
      return;
    }

    if (password.length < 6) {
      ToastAndroid.show(
        'Password must be at least 6 characters',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (password !== passwordConfirm) {
      ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT);
      console.log(password, passwordConfirm);
      return;
    }

    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            ToastAndroid.show(
              'That email address is already in use!',
              ToastAndroid.SHORT,
            );
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            ToastAndroid.show(
              'That email address is invalid!',
              ToastAndroid.SHORT,
            );
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
        placeholder="Email"
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={password => setPassword(password)}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={passwordconfirm => setPasswordConfirm(passwordconfirm)}
      />

      <TouchableOpacity onPress={functionRegister}>
        <Text style={styles.registerButton}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'lightblue',
            textAlign: 'center',
          }}>
          Already have an account?
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
  registerButton: {
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

export default Register;
