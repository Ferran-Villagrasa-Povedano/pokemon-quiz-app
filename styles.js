import { useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native';

export const useThemeStyles = () => {
  const theme = useColorScheme(); // Use hook to get current theme (light or dark)

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff', // Set background based on theme
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme === 'dark' ? 'white' : 'black', // Set text color based on theme
    },
  });
};
