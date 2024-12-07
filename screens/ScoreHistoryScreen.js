import { Text, View, FlatList, StyleSheet } from 'react-native';
import { retrieveScoreHistory } from '../storage';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ScoreHistoryScreen() {
  const navigation = useNavigation();

  const [scoreHistory, setScoreHistory] = useState([]);

  React.useEffect(() => {
    retrieveScoreHistory().then(setScoreHistory);
  }, []);

  return (
    <View>
      <FlatList
        data={scoreHistory}
        renderItem={({ item }) => (
          <View style={stiles.item}>
            {/*TODO: auto localization*/}
            <Text>
              {new Date(item.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            <Text>
              {item.username}: {item.difficulty || 'Unknown'} {item.score}{' '}
              points
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const stiles = StyleSheet.create({
  item: {
    backgroundColor: '#cdcdcd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
});
