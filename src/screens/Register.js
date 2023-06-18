import React, {useState, Route} from 'react';

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

  const functionLogin = () => {
    if (email == '123') {
      navigation.navigate('Home');
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
        onChangeText={password => setPassword(password)}
      />

      <TouchableOpacity onPress={functionLogin}>
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
