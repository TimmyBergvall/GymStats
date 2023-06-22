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
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [startWeight, setStartWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [length, setLength] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState('');



  useEffect(() => {
    const user = auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const detailsRef = userRef.collection('Details');
    const userDetailsRef = detailsRef.doc('userDetails');

    userDetailsRef
      .get()
      .then(doc => {
        if (doc.exists) {
            doc.data().age ? setAge(doc.data().age) : setAge('');
            doc.data().gender ? setGender(doc.data().gender) : setGender('');
            doc.data().startWeight ? setStartWeight(doc.data().startWeight) : setStartWeight('');
            doc.data().goalWeight
              ? setGoalWeight(doc.data().goalWeight)
              : setGoalWeight('');
            doc.data().length ? setLength(doc.data().length) : setLength('');
            doc.data().weeklyGoal
              ? setWeeklyGoal(doc.data().weeklyGoal)
              : setWeeklyGoal('');
          
        } else {
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }, []);

  const setDetails = async () => {
    const user = auth().currentUser;
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const detailsRef = userRef.collection('Details');

    if (age == "") {
      ToastAndroid.show('Please enter your age', ToastAndroid.SHORT);
      return;
    }

    if (gender == "") {
      ToastAndroid.show('Please enter your gender', ToastAndroid.SHORT);
      return;
    }

    if (startWeight == "") {
      ToastAndroid.show('Please enter your current weight', ToastAndroid.SHORT);
      return;
    }

    if (goalWeight == "") {
      ToastAndroid.show('Please enter your goal weight', ToastAndroid.SHORT);
      return;
    }

    if (length == "") {
      ToastAndroid.show('Please enter your length', ToastAndroid.SHORT);
      return;
    }

    if (weeklyGoal == "") {
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

      navigation.navigate('Settings');
      ToastAndroid.show('Details updated successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error creating/updating details:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Change Details</Text>

      <Text style={styles.textDescription}>Age:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setAge(text)}>
        {age}
      </TextInput>

      <Text style={styles.textDescription}>Gender:</Text>

      <TextInput
        style={styles.inputText}
        onChangeText={text => setGender(text)}>
        {gender}
      </TextInput>

      <Text style={styles.textDescription}>Start Weight:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setStartWeight(text)}>
        {startWeight}
      </TextInput>

      <Text style={styles.textDescription}>Weight Goal:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setGoalWeight(text)}>
        {goalWeight}
      </TextInput>

      <Text style={styles.textDescription}>Length:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setLength(text)}>
        {length}
      </TextInput>

      <Text style={styles.textDescription}>Weekly Goal:</Text>

      <TextInput
        style={styles.inputText}
        keyboardType="numeric"
        onChangeText={text => setWeeklyGoal(text)}>
        {weeklyGoal}
      </TextInput>

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
    marginTop: 20,
    marginBottom: 20,
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
    marginTop: 18,
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 15,
  },
  textDescription: {
    fontSize: 18,
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 5,
  },
});

export default Details;
