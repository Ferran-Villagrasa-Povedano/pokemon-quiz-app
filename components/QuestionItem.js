import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AnswerButton from './AnswerButton';
import { shuffle } from '../utils/shuffle';

const QuestionItem = ({ question, onAnswer, disabled }) => {
  const { question: questionContent, answers } = question;
  const shuffledAnswers = useMemo(() => shuffle(answers), [answers]);

  const onPressCallback = (answer) => {
    return () => {
      if (disabled) return; // Prevent re-clicking after answering
      const correct = answer.isCorrect;
      onAnswer(correct); // Notify parent component about the answer
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        {questionContent.text && (
          <Text style={styles.questionText}>{questionContent.text}</Text>
        )}
        {questionContent.image && (
          <Image
            source={{ uri: questionContent.image }}
            style={styles.questionImage}
          />
        )}
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          <AnswerButton
            answer={shuffledAnswers[0]}
            onPress={onPressCallback(shuffledAnswers[0])}
            disabled={disabled}
          />
          <AnswerButton
            answer={shuffledAnswers[1]}
            onPress={onPressCallback(shuffledAnswers[1])}
            disabled={disabled}
          />
        </View>

        <View style={styles.row}>
          <AnswerButton
            answer={shuffledAnswers[2]}
            onPress={onPressCallback(shuffledAnswers[2])}
            disabled={disabled}
          />
          <AnswerButton
            answer={shuffledAnswers[3]}
            onPress={onPressCallback(shuffledAnswers[3])}
            disabled={disabled}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  gridContainer: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionImage: {
    width: 150,
    height: 150,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});

export default QuestionItem;
