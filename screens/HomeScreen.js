import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native';

const DifficultySelection = () => {
  const [username, setUsername] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigation = useNavigation();

  const handleContinuePress = () => {
    if (!username) {
      Alert.alert('Error', 'Please enter a username.');
      return;
    }
    if (!difficulty) {
      Alert.alert('Error', 'Please select a difficulty.');
      return;
    }

    // Navigate to QuizScreen with the difficulty and username
    navigation.push('Quiz', {
      difficulty: difficulty,
      username: username,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon Quiz</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Difficulty Dropdown */}
      <Text style={styles.label}>Select Difficulty:</Text>
      <Picker
        style={styles.picker}
        selectedValue={difficulty}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>

      {/* Continue Button */}
      <Button onPress={handleContinuePress} title="Continue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
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
    borderColor: '#ff0000',
    borderWidth: 2,
    borderRadius: 5,
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
});

export default DifficultySelection;
