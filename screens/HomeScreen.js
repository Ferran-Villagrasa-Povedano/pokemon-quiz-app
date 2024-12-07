import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';
import ThemeToggler from '../components/ThemeToggler';

const DifficultySelection = () => {
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigation = useNavigation();
  const theme = useColorScheme();

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
      <View style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' }}>
        <ThemeToggler />
      </View>
      <View
        style={[
          styles.container,
          { backgroundColor: theme === 'dark' ? '#1a1a1a' : '#fff' },
        ]}
      >
        <Text
          style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}
        >
          Pokémon Quiz
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />

        <Text
          style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}
        >
          Select Difficulty:
        </Text>
        <Picker
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
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
  },
  continueButton: {
    backgroundColor: '#007bff',
    padding: 15,
    width: '80%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});

export default DifficultySelection;
