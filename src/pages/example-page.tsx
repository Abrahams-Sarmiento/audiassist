import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { CustomInput } from '../components/custom-input';
import { CustomButton } from '../components/custom-button';

export const ExamplePage = () => (
  <View>
    <FormContainer>
      <FormTitle>Crear Usuario</FormTitle>

      <Field>
        <Label>Nombre</Label>
        <CustomInput placeholder="Pepe Mota" />
      </Field>

      <View style={styles.buttonContainer}>
        <CustomButton title="Enviar" />
      </View>
    </FormContainer>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
});
