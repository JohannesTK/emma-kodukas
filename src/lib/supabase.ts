import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Chat history will not be saved.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Session management helpers
const SESSION_COOKIE_NAME = 'tehiskokk_session_id';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

export function getSessionId(): string {
  // Check for existing session cookie
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === SESSION_COOKIE_NAME && value) {
      return value;
    }
  }

  // Generate new session ID
  const newSessionId = crypto.randomUUID();
  document.cookie = `${SESSION_COOKIE_NAME}=${newSessionId}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  return newSessionId;
}

export function clearSession(): void {
  document.cookie = `${SESSION_COOKIE_NAME}=; max-age=0; path=/`;
}

// Database types
export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  image_url?: string;
  created_at: string;
}

export interface Session {
  id: string;
  created_at: string;
  updated_at: string;
}

// Database operations
export async function getOrCreateSession(sessionId: string): Promise<Session | null> {
  if (!supabase) return null;

  // Use upsert to handle race conditions - if session exists, just return it
  const { data, error } = await supabase
    .from('sessions')
    .upsert(
      { id: sessionId, updated_at: new Date().toISOString() },
      { onConflict: 'id', ignoreDuplicates: false }
    )
    .select()
    .single();

  if (error) {
    // If upsert fails, try to fetch existing session
    const { data: existingData } = await supabase
      .from('sessions')
      .select()
      .eq('id', sessionId)
      .maybeSingle();

    if (existingData) return existingData;

    console.error('Error with session:', error);
    return null;
  }

  return data;
}

export async function getMessages(sessionId: string): Promise<Message[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error getting messages:', error);
    return [];
  }

  return data || [];
}

export async function saveMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string,
  imageUrl?: string
): Promise<Message | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('messages')
    .insert({
      session_id: sessionId,
      role,
      content,
      image_url: imageUrl,
    })
    .select()
    .single();

  if (error) {
    console.error('Error saving message:', error);
    return null;
  }

  return data;
}

// Storage operations for recipe images
export async function uploadRecipeImage(
  imageBlob: Blob,
  filename: string
): Promise<string | null> {
  if (!supabase) return null;

  const path = `recipe-images/${Date.now()}-${filename}`;

  const { data, error } = await supabase.storage
    .from('recipe-images')
    .upload(path, imageBlob, {
      contentType: 'image/png',
      cacheControl: '31536000', // 1 year
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('recipe-images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}
