import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  Easing,
  Modal,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { darkTheme, lightTheme } from '../theme';
import { shuffle } from '../utils/shuffle';

import questionsData from '../questions';
import QuestionItem from './../components/QuestionItem';

import { useNavigation } from '@react-navigation/native';

export default function QuizScreen({ route }) {
  const { difficulty, username } = route.params;

  const navigation = useNavigation();
  const theme = useColorScheme();
  const styles = createStyles(theme);

  const [questions, setQuestions] = useState(
    shuffle(questionsData[difficulty])
  );
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [points, setPoints] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isTime, setIsTime] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const currentQuestion = questions[selectedQuestion];

  const totalTime = 10;
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const timerRef = useRef(null);

  const handleAnswer = (isCorrect, isTime) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    progressAnim.stopAnimation();

    if (isTime) {
      setIsTime(true);
      setIsCorrect(false);
    } else {
      setIsTime(false);
      setIsCorrect(isCorrect);
      if (isCorrect) {
        setPoints(points + 1);
      }
    }

    setModalVisible(true);
    setDisabled(true);
  };

  const handleContinue = () => {
    setModalVisible(false);
    setDisabled(false);

    setIsTime(false);

    setTimeLeft(totalTime);
    progressAnim.setValue(0);

    setSelectedQuestion(selectedQuestion + 1);

    if (selectedQuestion + 1 === questions.length) {
      navigation.replace('Result', {
        points,
        maxPoints: questions.length,
        username,
        difficulty,
      });
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          handleAnswer(false, true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: totalTime * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      progressAnim.stopAnimation();
    };
  }, [selectedQuestion]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      <Text style={styles.points}>
        Points: {points}/{questions.length}
      </Text>
      {currentQuestion && (
        <QuestionItem
          question={currentQuestion}
          onAnswer={handleAnswer}
          disabled={disabled}
        />
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={handleContinue}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: isCorrect ? '#4caf50' : '#f44336' },
            ]}
          >
            <Text style={styles.modalText}>
              {isTime ? 'Time out!' : isCorrect ? 'Correct!' : 'Incorrect!'}
            </Text>
            <Button onPress={handleContinue} title="Continue" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      backgroundColor:
        theme === 'dark' ? darkTheme.background : lightTheme.background,
    },
    points: {
      fontSize: 16,
      marginBottom: 20,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      padding: 20,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    modalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 20,
    },
    timerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    progressBarContainer: {
      height: 10,
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      overflow: 'hidden',
    },
    progressBar: {
      position: 'absolute',
      top: 0,
      height: 10,
      backgroundColor: '#76c7c0',
    },
  });
