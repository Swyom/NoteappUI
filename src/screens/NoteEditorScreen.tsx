import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';

interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  overlay: string;
  white: string;
}

interface NoteEditorScreenProps {
  colors: ThemeColors;
  navigation: any;
  route: any;
  onSaveNote: (note: any) => void;
}

export default function NoteEditorScreen({ colors, navigation, route, onSaveNote }: NoteEditorScreenProps) {
  const { height, width } = useWindowDimensions();
  const isTablet = width > 600;
  const sidePadding = isTablet ? 40 : 24;
  
  const editingNote = route?.params?.note;
  
  const [title, setTitle] = useState(editingNote?.title || '');
  const [body, setBody] = useState(editingNote?.snippet || '');

  const characterCount = body.length;
  const wordCount = body.trim() ? body.trim().split(/\s+/).filter(Boolean).length : 0;
  const currentFormattedDate = editingNote?.date || new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const handleSave = () => {
    if (!title.trim() && !body.trim()) {
      navigation.goBack();
      return;
    }
    
    const savedNote = {
      id: editingNote ? editingNote.id : Date.now().toString(),
      title: title.trim() || 'Untitled Note',
      snippet: body.trim(),
      date: editingNote ? editingNote.date : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
    
    onSaveNote(savedNote);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.headerCurveContainer}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' }}
          style={[styles.bannerFluid, { height: height * 0.20 }]}
          imageStyle={styles.fluidImageRadius}
        >
          <View style={[styles.translucentOverlay, { backgroundColor: colors.overlay }]}>
            <SafeAreaView style={styles.safeActionRow}>
              <View style={styles.glassFloatingPill}>
                <Pressable 
                  style={({ pressed }) => StyleSheet.compose(styles.glassBtn, pressed && styles.btnPressed)}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.glassBtnText}>← Back</Text>
                </Pressable>

                <View style={styles.verticalGlassDivider} />

                <Pressable 
                  style={({ pressed }) => StyleSheet.compose(
                    [styles.glassSaveBtn, { backgroundColor: colors.accent }], 
                    pressed && styles.btnPressed
                  )}
                  onPress={handleSave}
                >
                  <Text style={styles.saveBtnText}>Save</Text>
                </Pressable>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>

      <View style={[styles.formWorkspace, { paddingHorizontal: sidePadding }]}>
        <TextInput
          style={[styles.titleInputField, { color: colors.text }]}
          placeholder="Title"
          placeholderTextColor={colors.textSecondary}
          maxLength={60}
          value={title}
          onChangeText={setTitle}
          returnKeyType="next"
        />
        
        <View style={[styles.metricsDashboard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Last edited:</Text>
            <Text numberOfLines={1} style={[styles.metricValue, { color: colors.text }]}>{currentFormattedDate}</Text>
          </View>
          
          <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Word</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>{wordCount}</Text>
          </View>
          
          <View style={[styles.metricDivider, { backgroundColor: colors.border }]} />
          
          <View style={styles.metricItem}>
            <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Character</Text>
            <Text style={[styles.metricValue, { color: colors.text }]}>{characterCount}</Text>
          </View>
        </View>

        <TextInput
          style={[styles.bodyInputField, { color: colors.text }]}
          placeholder="write here...."
          placeholderTextColor={colors.textSecondary}
          multiline
          textAlignVertical="top"
          value={body}
          onChangeText={setBody}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCurveContainer: {
    overflow: 'hidden',
    paddingBottom: 2,
  },
  bannerFluid: {
    width: '100%',
  },
  fluidImageRadius: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  translucentOverlay: {
    flex: 1,
    justifyContent: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  safeActionRow: {
    alignItems: 'center',
    width: '100%',
  },
  glassFloatingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderRadius: 30,
    padding: 6,
    width: '85%',
    maxWidth: 340,
    justifyContent: 'space-between',
  },
  glassBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  glassBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  verticalGlassDivider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  glassSaveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  formWorkspace: {
    flex: 1,
    marginTop: 22,
  },
  titleInputField: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.6,
    paddingVertical: 8,
  },
  metricsDashboard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
  },
  metricItem: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  metricDivider: {
    width: 1,
    height: 26,
    opacity: 0.7,
  },
  bodyInputField: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    paddingVertical: 12,
  },
});