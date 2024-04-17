import { StyleSheet, View } from 'react-native';
import { CustomInput } from './src/components/custom-input';
import { CustomButton } from './src/components/custom-button';
import { FormContainer } from './src/components/form-container';
import { FormTitle } from './src/components/form-title';
import { Label } from './src/components/label';
import { Field } from './src/components/field';
import { ExamplePage } from './src/pages/example-page';

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
