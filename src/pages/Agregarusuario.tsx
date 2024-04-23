import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { CustomInput } from '../components/custom-input';
import { CustomButton } from '../components/custom-button';


export const Agregarusuario = () => (
    
    
    <View>
      <FormContainer>
        <FormTitle>Crear Usuairo</FormTitle>
  
        <Field>
          <Label>Correo Electronico</Label>
          <CustomInput placeholder="Paciente@gmail.com" />
        </Field>
        <Field>
          <Label>Contraseña Temporal</Label>
          <CustomInput placeholder="Audifono1234..." />
        </Field>
        <View style={styles.buttonContainer}>
          <CustomButton title="Crear Usuario" />
        </View>
      </FormContainer>
    </View>
  );
  
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 24,
    },
  });