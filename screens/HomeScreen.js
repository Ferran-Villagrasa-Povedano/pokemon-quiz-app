import {
  View,
  Text,
  Button,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import baseStyles from '../styles/base';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={baseStyles.container}>
      <Text>HomeScreen</Text>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Introdueix el nom:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Go</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Button
        onPress={() =>
          navigation.navigate('QuizScreen', { difficulty: 'easy' })
        }
        title="Easy"
      />
      <Button
        onPress={() =>
          navigation.navigate('QuizScreen', { difficulty: 'normal' })
        }
        title="Normal"
      />
      <Button
        onPress={() =>
          navigation.navigate('QuizScreen', { difficulty: 'hard' })
        }
        title="Hard"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
