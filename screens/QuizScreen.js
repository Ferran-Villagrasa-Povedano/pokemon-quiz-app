import { Text, View, Button } from 'react-native';
import baseStyles from '../styles/base';
import { useMemo, useState } from 'react';
import { shuffle } from '../utils';

import questionsData from '../questions';
import QuestionItem from './../components/QuestionItem';

export default function QuizScreen({ dificulty = 'easy' }) {
  const [questions, setQuestions] = useState(shuffle(questionsData[dificulty]));
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  return (
    <View style={baseStyles.container}>
      <QuestionItem question={questions[selectedQuestion]} />
    </View>
  );
}
