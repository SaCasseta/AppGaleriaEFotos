import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ConectaBanco from '../screens/ConectaBanco';
import Imagem from '../screens/imagem';

export default function App() {
  return (
    <View style={styles.container}>
      <Gps/>
      <ConectaBanco/>
      <Imagem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
