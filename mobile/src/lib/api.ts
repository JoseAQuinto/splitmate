import { supabase } from './supabase';

const API_URL = process.env.EXPO_PUBLIC_API_URL!; // ej: http://10.0.2.2:4000

export async function apiGet(path: string) {
  const { data: session } = await supabase.auth.getSession();
  const token = session.session?.access_token;
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
