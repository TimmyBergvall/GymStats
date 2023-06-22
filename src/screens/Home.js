import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/FontAwesome';

function Home({navigation}) {
  const user = firebase.auth().currentUser;

  useEffect(() => {
      const user = auth().currentUser;
      const db = firebase.firestore();
      const userRef = db.collection('Users').doc(user.uid);
      const detailsRef = userRef.collection('Details');
      const userDetailsRef = detailsRef.doc('userDetails');
  
      userDetailsRef.get().then((doc) => {
        if (doc.exists) {
          if (doc.data().complete == false) {
            navigation.navigate('Details');
          }
  
        } else {
            console.log('No such document!');
  
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);


 

  return (
    <ScrollView style={{backgroundColor: '#161616'}}>
      <Text style={styles.startMessage}>Welcome to GymStats</Text>

      <Icon name="home" size={30} color="#900" />

    </ScrollView>
  );
}

const HomeScreen = ({navigation}) => <Home navigation={navigation} />;

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 30,
    marginBottom: 5,
    fontSize: 28,
    textAlign: 'center',
  },
  loginButton: {
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
});

export default HomeScreen;
