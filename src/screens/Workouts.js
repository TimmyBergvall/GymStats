import React, {useState, useEffect} from 'react';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import {MultipleSelectList} from 'react-native-dropdown-select-list';

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

function Workouts({navigation}) {
  const user = firebase.auth().currentUser;
  const [workout, setWorkout] = useState('');
  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'Mobiles', disabled: true},
    {key: '2', value: 'Appliances'},
    {key: '3', value: 'Cameras'},
    {key: '4', value: 'Computers', disabled: true},
    {key: '5', value: 'Vegetables'},
    {key: '6', value: 'Diary Products'},
    {key: '7', value: 'Drinks'},
  ];

  const addWeight = async () => {
    const db = firebase.firestore();
    const userRef = db.collection('Users').doc(user.uid);
    const workoutRef = userRef.collection('Workouts');

    try {
      // Create a new weight document with the current date as the document ID
      const currentDate = new Date()
        .toLocaleString('sv-SE', {timeZone: 'Europe/Stockholm'})
        .split(' ')[0];
      const weightData = {
        workout: workout,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      // Add the weight document to the Weights subcollection with the current date as the document ID
      await workoutRef.doc(currentDate).set(weightData);

      console.log('Weight added successfully!');
      setWorkout('');
      navigation.navigate('Home');
      ToastAndroid.show('Weight added successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error adding weight:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <View style={styles.border}>
        <Text style={styles.startMessage}>Workout Sessions</Text>

        <Text style={styles.description}>Workout description:</Text>

        <View style={styles.container}>
          <View style={styles.selectListContainer}>


            <MultipleSelectList
              boxStyles={styles.box}
              setSelected={val => setSelected(val)}
              data={data}
              save="value"
              label="Categories"
            />
          </View>
        </View>

        <Text style={styles.description}>Workout time:</Text>

        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          keyboardType="numeric"
          value={workout}
          onChangeText={weight => setWorkout(weight)}
        />

        <TouchableOpacity
          onPress={() => {
            addWeight();
          }}>
          <Text style={styles.button}>Add Session</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 50,
    marginBottom: 65,
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
    padding: 22,
    color: 'white',
  },
  border: {
    backgroundColor: '#2d3030',
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectListContainer: {
    width: '70%',
    padding: 8,
  },
  box: {
    borderRadius: 0,
  },
});

export default Workouts;
