import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { CustomInput } from '../components/custom-input';
import { CustomButton } from '../components/custom-button';


export const EditarAudifono = () => (
    
    
    <View>
      <FormContainer>
        <FormTitle>Editar Audífono</FormTitle>
  
        <Field>
          <Label>Modelo </Label>
          <CustomInput placeholder="Unitron Stride P dura 600" />
        </Field>
        <Field>
          <Label>Información</Label>
          <CustomInput placeholder="Modelo de gama de entrada de la serie Stride P Dura" />
        </Field>
        <View style={styles.buttonContainer}>
          <CustomButton title="Guardar" />
        </View>
      </FormContainer>
    </View>
  );
  
  const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 24,
    },
  });