import { StyleSheet, View } from 'react-native';
import { ExamplePage } from './src/pages/example-page';
import { updateAuthState } from './src/utils/update-auth-state';

updateAuthState();

export default function App() {
  return (
    <View style={styles.container}>
      <ExamplePage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
});
