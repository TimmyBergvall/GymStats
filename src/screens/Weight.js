import React, {useState, useEffect} from 'react';
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
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

function Weight({navigation}) {
  const user = firebase.auth().currentUser;
  const [weight, setWeight] = useState('');

  const addWeight = async () => {
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const weightsRef = userRef.collection('Weights');

    try {
      if (weight == '') {
        ToastAndroid.show('Weight can not be empty', ToastAndroid.SHORT);
        return;
      }

      // Create a new weight document with the current date as the document ID
      const currentDate = new Date()
        .toLocaleString('sv-SE', {timeZone: 'Europe/Stockholm'})
        .split(' ')[0];
      const weightData = {
        weight: weight,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      // Add the weight document to the Weights subcollection with the current date as the document ID
      await weightsRef.doc(currentDate).set(weightData);

      console.log('Weight added successfully!');
      setWeight('');
      navigation.navigate('Home');
      ToastAndroid.show('Weight added successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error adding weight:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <View style={styles.border}>
        <Text style={styles.startMessage}>Today's Weight</Text>

        <Text style={styles.description}>Weight:</Text>

        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          keyboardType="numeric"
          value={weight}
          onChangeText={weight => setWeight(weight)}
        />

        <TouchableOpacity
          onPress={() => {
            addWeight();
          }}>
          <Text style={styles.button}>Set Weight</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 50,
    marginBottom: 5,
    fontSize: 28,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#315E5D',
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 64,
    marginRight: 64,
    marginBottom: 50,
    borderRadius: 25,
    marginTop: 24,
  },
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 40,
    color: 'white',
  },
  border: {
    backgroundColor: '#1F1F1F',
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 30,
    marginTop: 140,
    color: 'white',
  },
  description: {
    fontSize: 15,
    marginLeft: 50,
    marginBottom: 5,
    color: 'white',
    marginTop: 60,
  },
});

export default Weight;
