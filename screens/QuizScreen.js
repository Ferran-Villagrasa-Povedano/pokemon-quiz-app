import {
  Text,
  View,
  Button,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from 'react-native';
import { useThemeStyles } from '../styles';
import { useState, useEffect, useRef } from 'react';
import { shuffle } from '../utils/shuffle';

import questionsData from '../questions';
import QuestionItem from './../components/QuestionItem';

import { useNavigation } from '@react-navigation/native';

export default function QuizScreen({ route }) {
  const { difficulty, username } = route.params;

  const navigation = useNavigation();
  const baseStyles = useThemeStyles();

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

  const handleAnswer = (isCorrect, isTime) => {
    if (isTime) {
    setIsTime(true); // El tiempo se agotó
    setIsCorrect(false); // Tratarlo como incorrecto
  } else {
    setIsTime(false); // No es un caso de "Time Out"
    setIsCorrect(isCorrect); // Establecer si la respuesta fue correcta
    if (isCorrect) {
      setPoints(points + 1); // Incrementar puntos si es correcto
    }
  }

  setModalVisible(true); // Mostrar el modal
  setDisabled(true); 
  };

  const handleContinue = () => {
    setModalVisible(false);
    setDisabled(false);

    setIsTime(false);

    // Reiniciar temporizador y barra de progreso
    setTimeLeft(totalTime);
    progressAnim.setValue(0); // Reiniciar la animación

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
    // Countdown timer logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // Detener el temporizador
          handleAnswer(false, true); // Considerar la respuesta incorrecta
          return 0;
        }
        return prev - 1; // Reducir el tiempo en 1 segundo
      });
    }, 1000);

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: totalTime * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    return () => clearInterval(timer);
  }, [selectedQuestion]);

  // Interpolating the progress bar width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={baseStyles.container}>
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
            <Button
              style={styles.continueButton}
              onPress={handleContinue}
              title="Continue"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  points: {
    fontSize: 16,
    marginBottom: 20,
  },
  endContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  endButtonContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 80,
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
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
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
