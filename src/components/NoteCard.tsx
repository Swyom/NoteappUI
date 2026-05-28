import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NoteCardProps {
  item: {
    id: string;
    title: string;
    snippet: string;
    date: string;
  };
  onPress: () => void;
  onDelete: (id: string) => void;
  colors: any;
}

export default function NoteCard({ item, onPress, colors, onDelete }: NoteCardProps) {
  return (
    <Pressable 
      style={({ pressed }) => StyleSheet.flatten([
        styles.card, 
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.cardPressed
      ])}
      onPress={onPress}
    >
      <View style={styles.headerRow}>
        <Text numberOfLines={1} style={[styles.titleText, { color: colors.text }]}>
          {item.title || 'Untitled Thought'}
        </Text>
        
        <View style={styles.metaGroup}>
          <Text style={[styles.dateStampText, { color: colors.textSecondary }]}>
            {item.date || 'May 28'}
          </Text>
          <Pressable 
            onPress={() => onDelete(item.id)} 
            style={({ pressed }) => [styles.deleteBtn, { opacity: pressed ? 0.5 : 1 }]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
          </Pressable>
        </View>
      </View>

      <Text numberOfLines={2} style={[styles.snippetText, { color: colors.textSecondary }]}>
        {item.snippet || 'No additional content...'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    flex: 1,
    marginRight: 12,
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateStampText: {
    fontSize: 12,
    fontWeight: '500',
  },
  deleteBtn: {
    padding: 2,
  },
  snippetText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  },
});