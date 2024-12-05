import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { shuffle } from '../utils';

export default function QuestionItem({ question }) {
  const onPressCallback = (option) => {
    return () => {
      console.log(option === question.correct ? 'correct' : 'wrong');
    };
  };

  const options = shuffle([...question.options, question.correct]);

  return (
    <View>
      {question.questionType === 'text' && <Text>{question.question}</Text>}
      {question.questionType === 'image' && (
        <Image source={{ uri: question.question }} />
      )}
      {question.image && <Image source={{ uri: question.image }} />}

      {options.map(
        (option, index) =>
          question.answerType === 'text' && (
            <Button
              key={index}
              title={option}
              onPress={onPressCallback(option)}
            />
          )
      )}
    </View>
  );
}
