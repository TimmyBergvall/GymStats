import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Weight from './src/screens/Weight';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SignedInNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Weight" component={Weight} />
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
