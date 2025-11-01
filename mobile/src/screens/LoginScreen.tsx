import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { supabase } from '../lib/supabase';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function onSignIn() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return Alert.alert('Login error', error.message);
    if (data.session) navigation.replace('Home');
  }

  async function onSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return Alert.alert('Signup error', error.message);
    Alert.alert('Check your email', 'Confirm your account and sign in.');
  }

  return (
    <View style={{ flex:1, justifyContent:'center', padding:16, gap:12 }}>
      <Text style={{ fontSize:24, fontWeight:'700' }}>Splitly</Text>
      <Text style={{ opacity:0.7 }}>Sign in to split expenses</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth:1, borderRadius:8, padding:12 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth:1, borderRadius:8, padding:12 }}
      />

      <Button title={loading ? '...' : 'Sign in'} onPress={onSignIn} />
      <Button title="Create account" onPress={onSignUp} />
    </View>
  );
}
