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
  Modal,
  View,
} from 'react-native';

function Workouts({navigation}) {
  const user = firebase.auth().currentUser;
  const [workout, setWorkout] = useState('');
  const [selected, setSelected] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const data = [
    {key: '1', value: 'Back'},
    {key: '2', value: 'Triceps'},
    {key: '3', value: 'Chest'},
    {key: '4', value: 'Biceps'},
    {key: '5', value: 'Shoulders'},
    {key: '6', value: 'Legs'},
    {key: '7', value: 'Glutes'},
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
      ToastAndroid.show('Workout added successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error adding weight:', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Workout Sessions</Text>

      <Text style={styles.description}>Workout description:</Text>

      <View style={styles.container}>
        <View style={styles.selectListContainer}>
          <MultipleSelectList
            boxStyles={styles.box}
            setSelected={val => setSelected(val)}
            data={data}
            save="value"
            label="Trained Muscles"
            dropdownStyles={{backgroundColor: '#315E5D'}}
            search={false}
            placeholder="Select Muscles"
            maxHeight={10000}
            labelStyles={{color:'#dddddd'}}
            dropdownTextStyles={{color:'white'}}
            inputStyles={{color:'white'}}
          />
        </View>
      </View>

      <Text style={styles.description}>Workout time: (Minutes)</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          keyboardType="numeric"
          value={workout}
          onChangeText={weight => setWorkout(weight)}
        />
      </View>
      <View style={styles.buttonContainer}>
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
    color: '#FFFFFF', // White text color
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20, // Increase the top margin for better spacing
    marginBottom: 50, // Increase the bottom margin for better spacing
  },
  button: {
    backgroundColor: '#315E5D', // Change the background color
    color: 'white', // Change the text color
    fontSize: 24, // Change the font size
    textAlign: 'center',
    paddingVertical: 16, // Adjust vertical padding
    paddingHorizontal: 24, // Adjust horizontal padding
    borderRadius: 8, // Adjust border radius
    borderWidth: 2, // Add a border width
    borderColor: 'white', // Change the border color
    shadowColor: 'black', // Change the shadow color (iOS specific)
    shadowOffset: {width: 2, height: 2}, // Adjust the shadow offset (iOS specific)
    shadowOpacity: 0.6, // Adjust the shadow opacity (iOS specific)
    shadowRadius: 3, // Adjust the shadow radius (iOS specific)
    elevation: 3, // Add a shadow effect (Android specific)
  },
  inputText: {
    height: 40,
    borderColor: '#3D6D87', // Update the border color
    borderBottomWidth: 1, // Use borderBottomWidth for a better look
    width: '75%',
    marginBottom: 40,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    fontSize: 18,
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
    color: '#B3B3B3', // Lighter gray text color
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectListContainer: {
    width: '75%', // Increase the width for better visibility
    marginBottom: 20, // Add some margin at the bottom for spacing
  },
  box: {
    borderColor: '#3D6D87', // Update the border color
    borderBottomWidth: 1, // Use borderBottomWidth for a better look
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Workouts;
