import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { darkTheme, lightTheme } from '../theme';

const AnswerButton = ({ answer, onPress }) => {
  const theme = useColorScheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity style={styles.answerButton} onPress={onPress}>
      {answer.text && <Text style={styles.answerText}>{answer.text}</Text>}
      {answer.image && (
        <Image source={{ uri: answer.image }} style={styles.answerImage} />
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    answerButton: {
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#333' : '#b0b0b0',
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
    },
    answerText: {
      fontSize: 16,
      textAlign: 'center',
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
    answerImage: {
      width: 100,
      height: 100,
      aspectRatio: 1,
      resizeMode: 'contain',
    },
  });

export default AnswerButton;
