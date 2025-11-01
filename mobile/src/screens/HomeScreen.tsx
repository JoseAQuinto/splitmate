import { View, Text, Button } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function logout() {
    await supabase.auth.signOut();
  }

  return (
    <View style={{ flex:1, padding:16, gap:12 }}>
      <Text style={{ fontSize:22, fontWeight:'600' }}>Welcome to Splitly</Text>
      <Text>Logged in as: {email ?? '-'}</Text>
      <Button title="Sign out" onPress={logout} />
    </View>
  );
}
