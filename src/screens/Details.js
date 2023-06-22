import React, {useState, useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import {BackHandler} from 'react-native';
import auth from '@react-native-firebase/auth';

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
import {ToastAndroid} from 'react-native';

function Details({navigation}) {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [goalWeight, setGoalWeight] = useState(0);
  const [length, setLength] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const user = auth().currentUser;
      const db = firebase.firestore();
      const userRef = db.collection('Users').doc(user.uid);
      const detailsRef = userRef.collection('Details');
      const userDetailsRef = detailsRef.doc('userDetails');

      userDetailsRef
        .get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().complete == false) {
              const disableBackGesture = () => true;

              navigation.setOptions({
                tabBarStyle: {display: 'none'},
                headerRight: () => null,
                headerLeft: () => null,
              });

              BackHandler.addEventListener('beforeRemove', disableBackGesture);

              return () => {
                BackHandler.removeEventListener(
                  'beforeRemove',
                  disableBackGesture,
                );
              };
            }
          } else {
            console.log('No such document!');
          }
        })
        .catch(error => {
          console.log('Error getting document:', error);
        });
    });

    return unsubscribe;
  }, [navigation]);

  const setDetails = async () => {
    const user = auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const detailsRef = userRef.collection('Details');

    if (age == 0) {
      ToastAndroid.show('Please enter your age', ToastAndroid.SHORT);
      return;
    }

    if (gender == '') {
      ToastAndroid.show('Please enter your gender', ToastAndroid.SHORT);
      return;
    }

    if (goalWeight == 0) {
      ToastAndroid.show('Please enter your goal weight', ToastAndroid.SHORT);
      return;
    }

    if (length == 0) {
      ToastAndroid.show('Please enter your length', ToastAndroid.SHORT);
      return;
    }

    if (weeklyGoal == 0) {
      ToastAndroid.show('Please enter your weekly goal', ToastAndroid.SHORT);
      return;
    }

    try {
      const userDetails = {
        complete: true,
        gender: gender,
        length: length,
        age: age,
        weeklyGoal: weeklyGoal,
        goalWeight: goalWeight,
      };

      // Set the user details document in the "Details" collection with merge: true
      await detailsRef.doc('userDetails').set(userDetails, {merge: true});

      console.log('Details created/updated successfully!');

      navigation.navigate('Home');
    } catch (error) {
      console.log('Error creating/updating details:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Enter details</Text>

      <Text style={styles.textDescription}>Age:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setAge(text)}></TextInput>

      <Text style={styles.textDescription}>Gender:</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={text => setGender(text)}></TextInput>

      <Text style={styles.textDescription}>Weight Goal:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setGoalWeight(text)}></TextInput>

      <Text style={styles.textDescription}>Length:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setLength(text)}></TextInput>

      <Text style={styles.textDescription}>Weekly Goal:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setWeeklyGoal(text)}></TextInput>

      <TouchableOpacity
        onPress={() => {
          setDetails();
        }}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: 28,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#276B7F',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 64,
    marginRight: 64,
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
    marginBottom: 20,
  },
  textDescription: {
    fontSize: 18,
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 5,
  },
});

export default Details;
