import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import React, { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import ThemeToggler from '../components/ThemeToggler';
import { darkTheme, lightTheme } from '../theme';

const DifficultySelection = () => {
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigation = useNavigation();

  const theme = useColorScheme();
  const styles = createStyles(theme);

  const handleContinuePress = () => {
    if (!username) {
      Alert.alert('Error', 'Please enter a username.');
      return;
    }
    if (!difficulty) {
      Alert.alert('Error', 'Please select a difficulty.');
      return;
    }

    navigation.push('Quiz', {
      difficulty: difficulty,
      username: username,
    });
  };

  return (
    <>
      <View style={styles.themeContainer}>
        <ThemeToggler />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Pokémon Quiz</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor={
            theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'
          }
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Select Difficulty:</Text>
        <Picker
          dropdownIconColor={theme === 'dark' ? 'white' : 'black'}
          style={styles.picker}
          selectedValue={difficulty}
          onValueChange={(itemValue) => setDifficulty(itemValue)}
        >
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>

        <View style={styles.buttonsContainer}>
          <Button
            title="See Score History"
            onPress={() => {
              navigation.push('ScoreHistory');
            }}
          />
          <Button onPress={handleContinuePress} title="Continue" />
        </View>
      </View>
    </>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    themeContainer: {
      backgroundColor:
        theme === 'dark' ? darkTheme.background : lightTheme.background,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor:
        theme === 'dark' ? darkTheme.background : lightTheme.background,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
    label: {
      fontSize: 16,
      marginBottom: 10,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
    input: {
      width: '80%',
      height: 40,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
      borderColor: theme === 'dark' ? darkTheme.border : lightTheme.border,
      borderWidth: 2,
      borderRadius: 5,
      marginBottom: 20,
      paddingLeft: 10,
    },
    picker: {
      width: '80%',
      height: 80,
      marginBottom: 20,
      paddingLeft: 10,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
      borderColor: theme === 'dark' ? darkTheme.border : lightTheme.border,
      borderWidth: 2,
      borderRadius: 5,
    },
    buttonsContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
  });

export default DifficultySelection;
