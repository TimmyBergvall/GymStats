import React, { useState, useEffect } from 'react';
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

function Details({ navigation }) {
  const user = firebase.auth().currentUser;

  const addWeight = async () => {
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const weightsRef = userRef.collection('Weights');
  
    try {
      // Create a new weight document with the current date as the document ID
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in the format 'YYYY-MM-DD'
      const weightData = {
        weight: 80,
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
    <ScrollView style={{ backgroundColor: '#161616' }}>
      <Text style={styles.startMessage}>Weight</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addWeight();
        }}
      >
        <Text style={styles.buttonText}>Add weight</Text>
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
  button: {
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
  buttonText: {
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

export default Details;
