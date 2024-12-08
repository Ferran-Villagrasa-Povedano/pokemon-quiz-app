import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { retrieveScoreHistory } from '../storage';
import { darkTheme, lightTheme } from '../theme';

export default function ScoreHistoryScreen() {
  const navigation = useNavigation();

  const theme = useColorScheme();
  const stiles = createStyles(theme);

  const [scoreHistory, setScoreHistory] = useState([]);

  React.useEffect(() => {
    retrieveScoreHistory().then(setScoreHistory);
  }, []);

  return (
    <View style={stiles.container}>
      <FlatList
        data={scoreHistory}
        renderItem={({ item }) => (
          <View style={stiles.item}>
            {/*TODO: auto localization*/}
            <Text style={stiles.text}>
              {new Date(item.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
            <Text style={stiles.text}>
              {item.username}: {item.difficulty || 'Unknown'} {item.score}{' '}
              points
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor:
        theme === 'dark' ? darkTheme.background : lightTheme.background,
    },
    item: {
      backgroundColor: theme === 'dark' ? '#333' : '#cdcdcd',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10,
    },
    text: {
      color: theme === 'dark' ? darkTheme.text : lightTheme.text,
    },
  });
