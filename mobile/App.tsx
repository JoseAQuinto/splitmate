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
  // Estado para saber si estamos logueados y si ya se verificó la sesión
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al arrancar, mira si ya hay sesión activa en el dispositivo
    supabase.auth.getSession().then(({ data }) => {
      setLogged(!!data.session);
      setLoading(false);
    });

    const result = supabase.auth.onAuthStateChange((_event, session) => {
      setLogged(!!session);
    });

    // Limpieza: al desmontar, cancela la suscripción
    return () => result.data.subscription.unsubscribe();
  }, []);

  // Mientras carga, loading
  if (loading) return null;

  return (
    <NavigationContainer>
      {logged ? (
        // Navegación del usuario autenticado
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: 'Splitmate' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      ) : (
        // Navegación del usuario no autenticado
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
