import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { CustomInput } from '../components/custom-input';
import { CustomButton } from '../components/custom-button';


export const CrearCalendario = () => (
    
    
    <View>
      <FormContainer>
        <FormTitle>Crear Calendario</FormTitle>
  
        <Field>
          <Label>Correo Electronico del paciente </Label>
          <CustomInput placeholder="Paciente@gmail.com" />
        </Field>
        <View style={styles.buttonContainer}>
          <CustomButton title="Crear Calendario" />
        </View>
      </FormContainer>
    </View>
  );
  
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 24,
    },
  });