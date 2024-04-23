import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { CustomInput } from '../components/custom-input';
import { CustomButton } from '../components/custom-button';


export const Createuser = () => (
    <View>
      <FormContainer>
        <FormTitle>Registrarme</FormTitle>
  
        <Field>
          <Label>Correo Electronico</Label>
          <CustomInput placeholder="Audifono@hotmail.com" />
        </Field>
        <Field>
          <Label>Contraseña</Label>
          <CustomInput placeholder="Audifono1234...." />
        </Field>
        <View style={styles.buttonContainer}>
          <CustomButton title="Continuar" />
        </View>
      </FormContainer>
    </View>
  );
  
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 24,
    },
  });