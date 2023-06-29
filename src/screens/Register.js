import React, {useState, Route} from 'react';
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

function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [length, setLength] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState('');

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
          createDetails();
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

  const createDetails = async () => {
    const user = auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const detailsRef = userRef.collection('Details');

    if (age == '') {
      ToastAndroid.show('Please enter your age', ToastAndroid.SHORT);
      return;
    }

    if (gender == '') {
      ToastAndroid.show('Please enter your gender', ToastAndroid.SHORT);
      return;
    }

    if (startWeight == '') {
      ToastAndroid.show('Please enter your current weight', ToastAndroid.SHORT);
      return;
    }

    if (goalWeight == '') {
      ToastAndroid.show('Please enter your goal weight', ToastAndroid.SHORT);
      return;
    }

    if (length == '') {
      ToastAndroid.show('Please enter your length', ToastAndroid.SHORT);
      return;
    }

    if (weeklyGoal == '') {
      ToastAndroid.show('Please enter your weekly goal', ToastAndroid.SHORT);
      return;
    }

    try {
      const userDetails = {
        complete: true,
        gender: gender,
        length: length,
        age: age,
        startWeight: startWeight,
        weeklyGoal: weeklyGoal,
        goalWeight: goalWeight,
      };

      // Set the user details document in the "Details" collection with merge: true
      await detailsRef.doc('userDetails').set(userDetails, {merge: true});

      console.log('Details created/updated successfully!');

      addWeight();

      navigation.navigate('Home');
    } catch (error) {
      console.log('Error creating/updating details:', error);
    }
  };

  const addWeight = async () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const weightsRef = userRef.collection('Weights');

    try {
      // Create a new weight document with the current date as the document ID
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format 'YYYY-MM-DD'
      const weightData = {
        weight: startWeight,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      // Add the weight document to the Weights subcollection with the current date as the document ID
      await weightsRef.doc(currentDate).set(weightData);

      console.log('Weight added successfully!');
    } catch (error) {
      console.log('Error adding weight:', error);
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
      <TextInput
        style={styles.inputText}
        placeholder="Confirm Password"
        autoCapitalize="none"
        secureTextEntry={true}
        onChangeText={passwordconfirm => setPasswordConfirm(passwordconfirm)}
      />

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        placeholder="Age"
        onChangeText={text => setAge(text)}></TextInput>

      <TextInput
        style={styles.inputText}
        onChangeText={text => setGender(text)}
        placeholder="Gender"></TextInput>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setLength(text)}
        placeholder="Length"></TextInput>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setStartWeight(text)}
        placeholder="Current Weight"></TextInput>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setGoalWeight(text)}
        placeholder="Weight Goal"></TextInput>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setWeeklyGoal(text)}
        placeholder="Weekly Training Goal"></TextInput>

      <TouchableOpacity onPress={functionRegister}>
        <Text style={styles.registerButton}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            color: 'lightblue',
            textAlign: 'center',
            marginBottom: 60,
          }}>
          Already have an account?
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 28,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#276B7F',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 64,
    marginRight: 64,
    marginTop: 15,
  },
});

export default Register;
