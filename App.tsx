import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import StackNavigator from './src/screens/StackNavigator';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  startMessage: {
    marginTop: 32,
    fontSize: 28,
    textAlign: 'center',
  },
});

export default App;