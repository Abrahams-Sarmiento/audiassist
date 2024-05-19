import { StyleSheet, View } from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { ListElement } from '../components/list-element';
import { Link } from 'expo-router';

export const VerUsuarios = () => (
  <View>
    <FormTitle>Lista de Pacientes</FormTitle>
    <Link href="/crear-usuario">Crear usuario</Link>
    <FormContainer>
      <Field>
        <ListElement>Email:RobertoalzanY@hotmail.com </ListElement>
        <ListElement>Email:MariaDiaz@gmail.com</ListElement>
        <ListElement>Email:GladysRiquelme@outlook.com</ListElement>
        <ListElement>Email:JosefinaBustos@gmail.com</ListElement>
        <ListElement>Email:JesusAlvarado@hotmail.com</ListElement>
        <ListElement>Email:EleonoBrito@gmail.com</ListElement>
        <ListElement>Email:JoseGonzalez@hotmail.com</ListElement>
      </Field>
    </FormContainer>
  </View>
);
