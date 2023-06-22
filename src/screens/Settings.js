import React, {useState, Route, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CommonActions} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';

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
  Alert,
  View,
} from 'react-native';

function Settings({navigation}) {
  const user = auth().currentUser;
  const [age, setAge] = useState("");
  const [gender, setGender] = useState('');
  const [startWeight, setStartWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [length, setLength] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");

  const functionLogout = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => signOut(),
        },
      ],
      {cancelable: false},
    );
  };

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
          doc.data().age ? setAge(doc.data().age) : setAge("");
          doc.data().gender ? setGender(doc.data().gender) : setGender('');
          doc.data().startWeight ? setStartWeight(doc.data().startWeight) : setStartWeight('');
          doc.data().goalWeight ? setGoalWeight(doc.data().goalWeight) : setGoalWeight("");
          doc.data().length ? setLength(doc.data().length) : setLength(0);
          doc.data().weeklyGoal ? setWeeklyGoal(doc.data().weeklyGoal) : setWeeklyGoal("");

        } else {
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }, []);

  function signOut() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
      .catch(error => {
        console.log('Error signing out:', error);
      });
  }

  const changeDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Signed in as:</Text>
      <Text style={styles.userEmail}>{user.email}</Text>

      <Text style={styles.sectionTitle}>Your details:</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          Age: {age} {'\n'}
          Gender: {gender} {'\n'}
          Start weight: {startWeight} {'\n'}
          Goal weight: {goalWeight} {'\n'}
          Length: {length} {'\n'}
          Weekly goal: {weeklyGoal}
        </Text>
      </View>

      <TouchableOpacity onPress={changeDetails} style={styles.button}>
        <Text style={styles.buttonText}>Change details</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={functionLogout} style={styles.signOutButton}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  detailsContainer: {
    backgroundColor: '#276B7F',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  detailsText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#276B7F',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#890000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Settings;
