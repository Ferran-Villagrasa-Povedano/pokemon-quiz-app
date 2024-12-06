import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const AnswerButton = ({ answer, onPress }) => {
  return (
    <TouchableOpacity style={styles.answerButton} onPress={onPress}>
      {answer.text && <Text style={styles.answerText}>{answer.text}</Text>}
      {answer.image && (
        <Image source={{ uri: answer.image }} style={styles.answerImage} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  answerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  answerImage: {
    width: 100,
    height: 100,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});

export default AnswerButton;
