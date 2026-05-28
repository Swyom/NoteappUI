import React from 'react';
import { StyleSheet, TextInput, View, useWindowDimensions } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  colors: any;
}

export default function SearchBar({ value, onChangeText, colors }: SearchBarProps) {
  const { width } = useWindowDimensions();
  const isTablet = width > 600;

  return (
    <View style={[styles.container, { paddingHorizontal: isTablet ? 32 : 20 }]}>
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: colors.surface, 
            color: colors.text, 
            borderColor: colors.border 
          }
        ]}
        placeholder="Search notes..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    height: 46,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});