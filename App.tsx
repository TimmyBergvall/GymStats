import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';



import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Weight from './src/screens/Weight';
import Settings from './src/screens/Settings';
import Details from './src/screens/Details';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SignedInNavigator() {
  const navigation = useNavigation(); 


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#276B7F' },
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#333333' },
        headerRight: () => 
          <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ marginRight: 10 }}>
            <Icon name="settings-outline" size={25} color="#fff" />
          </TouchableOpacity>,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline'; // Icon name for the Home screen
          } else if (route.name === 'Weight') {
            iconName = 'barbell-outline'; // Icon name for the Weight screen
          } else if (route.name === 'Details') {
            iconName = 'list-outline'; // Icon name for the Details screen
          } 
          // Add more conditions for additional screens

          return <Icon name={iconName as string} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Weight" component={Weight} />
      <Tab.Screen name="Details" component={Details} />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarButton: () => null }} />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return null; // Render a loading state if still initializing
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'SignedIn' : 'Login'}
        screenOptions={{
          headerStyle: { backgroundColor: '#276B7F' },
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeft: () => null, // Remove back button
        }}>
        {user ? (
          <Stack.Screen
            name="SignedIn"
            component={SignedInNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                gestureEnabled: false,
              }}
            />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
