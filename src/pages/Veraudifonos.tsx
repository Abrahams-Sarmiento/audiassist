import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { ListElement } from '../components/list-element';

export const Veraudifonos = () => (
    
    
    <View>
         <FormTitle>Lista de audífonos </FormTitle>
      <FormContainer>
        <Field> 
          <ListElement>Modelo: Stride P Dura 600 </ListElement>
          <ListElement>Modelo: T Max sp 500  </ListElement>
          <ListElement>Modelo: T Moxi Fit pro  </ListElement>
          <ListElement>Modelo: D Moxi Fit 600  </ListElement>
          <ListElement>Modelo: Moxi Blu 3 </ListElement>
          <ListElement>Modelo: Vivante 9 </ListElement>
          <ListElement>Modelo: Shine Rev +P </ListElement>      
        </Field>
      </FormContainer>
    </View>
  );
  
  
  