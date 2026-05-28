import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Switch, 
  Pressable, 
  useWindowDimensions 
} from 'react-native';
import SearchBar from '../components/SearchBar';
import NoteCard from '../components/NoteCard';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
}

interface NotesListingScreenProps {
  notes: any[];
  colors: ThemeColors;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  onDeleteNote: (id: string) => void;
  navigation: any;
}

export default function NotesListingScreen({ 
  notes,
  colors, 
  isDarkMode, 
  setIsDarkMode, 
  onDeleteNote,
  navigation
}: NotesListingScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();
  
  const isTablet = width > 600;
  const numColumns = isTablet ? 2 : 1;
  const sidePadding = isTablet ? 40 : 24;

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={[styles.emptyIconCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={styles.emptyIcon}>✨</Text>
      </View>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>Your mind is clear</Text>
      <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
        No notes found matching your search criteria.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingHorizontal: sidePadding }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Hello, Swyom</Text>
          <Text style={[styles.title, { color: colors.text, fontSize: isTablet ? 38 : 32 }]}>
            Workspace
          </Text>
        </View>
        
        <View style={[styles.togglePill, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.toggleEmoji, { opacity: isDarkMode ? 0.4 : 1 }]}>☀️</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#E2E8F0', true: '#27272A' }}
            thumbColor={isDarkMode ? '#A5B4FC' : '#4F46E5'}
            style={styles.switchNative}
          />
          <Text style={[styles.toggleEmoji, { opacity: isDarkMode ? 1 : 0.4 }]}>🌙</Text>
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} colors={colors} />
      </View>

      <FlatList
        key={numColumns}
        data={filteredNotes}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={isTablet ? styles.gridRowGap : null}
        contentContainerStyle={[styles.listFlow, { paddingHorizontal: sidePadding }]}
        ListEmptyComponent={renderEmptyState}
        renderItem={({ item }) => (
          <View style={{ width: isTablet ? '48.5%' : '100%' }}>
            <NoteCard 
              item={item}
              colors={colors}
              onPress={() => navigation.navigate('Editor', { note: item })}
              onDelete={onDeleteNote}
            />
          </View>
        )}
      />

      <View style={[styles.fabShadowContainer, { paddingHorizontal: sidePadding }]}>
        <Pressable 
          style={({ pressed }) => StyleSheet.compose(
            [styles.premiumFab, { backgroundColor: colors.accent }],
            pressed && styles.fabActive
          )}
          onPress={() => navigation.navigate('Editor')}
        >
          <Text style={styles.premiumFabText}>Write Note</Text>
          <Text style={styles.premiumFabIcon}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 24,
    paddingBottom: 12,
  },
  greeting: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontWeight: '900',
    letterSpacing: -1,
  },
  togglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 30,
    borderWidth: 1,
  },
  toggleEmoji: {
    fontSize: 11,
    marginHorizontal: 4,
  },
  switchNative: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  searchWrapper: {
    marginTop: 8,
  },
  listFlow: {
    paddingBottom: 140,
    flexGrow: 1,
  },
  gridRowGap: {
    justifyContent: 'space-between',
  },
  fabShadowContainer: {
    position: 'absolute',
    bottom: 34,
    width: '100%',
    alignItems: 'center',
  },
  premiumFab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 280,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  fabActive: {
    transform: [{ scale: 0.96 }],
    opacity: 0.95,
  },
  premiumFabText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.1,
    marginRight: 6,
  },
  premiumFabIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});