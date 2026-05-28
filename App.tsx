import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Platform, useColorScheme, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from './src/styles/themes';
import NotesListingScreen from './src/screens/NoteListingScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';

const Stack = createNativeStackNavigator();

export interface Note {
  id: string;
  title: string;
  snippet: string;
  date: string;
}

const INITIAL_NOTES: Note[] = [
  { id: '1', title: 'Design System Ideas', snippet: 'Explore minimalist UI components, pastel color palettes, and fluid typography principles...', date: 'May 28' },
  { id: '2', title: 'Weekly Groceries', snippet: 'Almond milk, organic avocados, sourdough bread, cold brew coffee, and dark chocolate.', date: 'May 25' },
  { id: '3', title: 'React Native Architecture', snippet: 'Deep dive into the New Architecture, Fabric renderer, TurboModules, and JSI benefits.', date: 'May 20' },
  { id: '4', title: 'Gym Workout Routine', snippet: 'Push Day: Bench press 4x8, Overhead press 3x10, Incline dumbbell flyes 3x12, Tricep dips.', date: 'May 18' },
];

export default function App() {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === 'dark');
  const [notes, setNotes] = useState<Note[]>(INITIAL_NOTES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('@notes');
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (e) {
        console.error('Failed to load notes', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadNotes();
  }, []);

  const saveNotesToStorage = async (newNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('@notes', JSON.stringify(newNotes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  };

  const handleSaveNote = (newNote: Note) => {
    let newNotes = [];
    const existingIndex = notes.findIndex(n => n.id === newNote.id);
    if (existingIndex >= 0) {
      newNotes = [...notes];
      newNotes[existingIndex] = newNote;
    } else {
      newNotes = [newNote, ...notes];
    }
    setNotes(newNotes);
    saveNotesToStorage(newNotes);
  };

  const handleDeleteNote = (id: string) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    saveNotesToStorage(newNotes);
  };

  useEffect(() => {
    setIsDarkMode(systemTheme === 'dark');
  }, [systemTheme]);

  const colors = getThemeColors(isDarkMode);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="Listing">
            {(props) => (
              <NotesListingScreen
                {...props}
                notes={notes}
                colors={colors}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                onDeleteNote={handleDeleteNote}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Editor">
            {(props) => (
              <NoteEditorScreen
                {...props}
                colors={colors}
                onSaveNote={handleSaveNote}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});