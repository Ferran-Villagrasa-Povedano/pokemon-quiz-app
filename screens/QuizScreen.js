import { Text, View, Button, StyleSheet, Modal } from 'react-native';
import baseStyles from '../styles/base';
import { useState } from 'react';
import { shuffle } from '../utils/shuffle';

import questionsData from '../questions';
import QuestionItem from './../components/QuestionItem';

import { useNavigation } from '@react-navigation/native';

export default function QuizScreen({ route }) {
  const { difficulty, username } = route.params;

  const navigation = useNavigation();

  const [questions, setQuestions] = useState(
    shuffle(questionsData[difficulty])
  );
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [points, setPoints] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setPoints(points + 1);
    }
    setIsCorrect(isCorrect);
    setModalVisible(true);
    setDisabled(true);
  };

  const handleContinue = () => {
    setModalVisible(false);
    setDisabled(false);
    setSelectedQuestion(selectedQuestion + 1);
  };

  const currentQuestion = questions[selectedQuestion];

  return (
    <View style={baseStyles.container}>
      {selectedQuestion < questions.length ? (
        <>
          <Text style={styles.points}>
            Points: {points}/{questions.length}
          </Text>
          <QuestionItem
            question={currentQuestion}
            onAnswer={handleAnswer}
            disabled={disabled}
          />
        </>
      ) : (
        <View style={styles.endContainer}>
          <Text style={styles.endText}>Quiz Complete!</Text>
          <Text style={styles.endText}>
            You scored {points}/{questions.length} points.
          </Text>
          <View style={styles.endButtonContainer}>
            <Button
              title="Return to Home"
              onPress={() => {
                navigation.replace('Home');
              }}
            />
            <Button
              title="See Score History"
              onPress={() => {
                navigation.replace('ScoreHistory');
              }}
            />
          </View>
        </View>
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
              {isCorrect ? 'Correct!' : 'Incorrect!'}
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
});
