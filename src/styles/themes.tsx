export const getThemeColors = (isDarkMode: boolean) => ({
  background: isDarkMode ? '#121212' : '#F8F9FA',
  surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  text: isDarkMode ? '#E0E0E0' : '#1A1A1A',
  textSecondary: isDarkMode ? '#A0A0A0' : '#6C757D',
  border: isDarkMode ? '#333333' : '#E9ECEF',
  accent: '#6366F1',
  overlay: 'rgba(0, 0, 0, 0.35)',
  white: '#FFFFFF',
});