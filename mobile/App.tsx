import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { supabase } from './src/lib/supabase';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<'Login' | 'Home'>('Login');

  useEffect(() => {
    // Si hay sesión activa, salta a Home
    supabase.auth.getSession().then(({ data }) => {
      setInitialRoute(data.session ? 'Home' : 'Login');
    });

    // Escucha cambios de auth
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setInitialRoute(session ? 'Home' : 'Login');
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerTitle: 'Splitly' }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
