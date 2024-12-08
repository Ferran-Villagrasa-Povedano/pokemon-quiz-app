import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { addScore } from '../storage';
import { darkTheme, lightTheme } from '../theme';

export default function ResultScreen({ route }) {
  const { points, maxPoints, username, difficulty } = route.params;
  const navigation = useNavigation();
  const theme = useColorScheme();
  const styles = createStyles(theme);

  useEffect(() => {
    addScore(username, difficulty, points);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Complete!</Text>
      <Text style={styles.text}>
        {username}, you scored {points}/{maxPoints} points.
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="See Score History"
          onPress={() => {
            navigation.replace('ScoreHistory');
          }}
        />
        <Button
          title="Return to Home"
          onPress={() => {
            navigation.replace('Home');
          }}
        />
      </View>
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
    buttonsContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    username: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    points: {
      fontSize: 16,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
    text: {
      fontSize: 18,
      marginBottom: 10,
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
  });
