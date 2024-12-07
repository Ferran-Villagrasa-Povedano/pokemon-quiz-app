import AsyncStorage from '@react-native-async-storage/async-storage';
// https://react-native-async-storage.github.io/async-storage/docs/usage/

export const storeScoreHistory = async (data) => {
  try {
    await AsyncStorage.setItem('scoreHistory', JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export const retrieveScoreHistory = async () => {
  try {
    const value = await AsyncStorage.getItem('scoreHistory');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
  }
};

export const addScore = async (username, difficulty, score) => {
  try {
    const scoreHistory = await retrieveScoreHistory();
    const data = { date: new Date(), username, difficulty, score };
    if (scoreHistory) {
      scoreHistory.push(data);
      await storeScoreHistory(scoreHistory);
    } else {
      await storeScoreHistory([data]);
    }
  } catch (error) {
    console.error(error);
  }
};
