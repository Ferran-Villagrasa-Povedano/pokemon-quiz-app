import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { addScore } from '../storage';

export default function ResultScreen({ route }) {
  const { points, maxPoints, username, difficulty } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    addScore(username, difficulty, points);
  }, []);

  return (
    <View style={styles.endContainer}>
      <Text style={styles.endText}>Quiz Complete!</Text>
      <Text style={styles.endText}>
        {username}, you scored {points}/{maxPoints} points.
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
});
