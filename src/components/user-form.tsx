import { StyleSheet, View } from 'react-native';
import { CustomInput } from './custom-input';
import { Field } from './field';
import { FormContainer } from './form-container';
import { FormTitle } from './form-title';
import { Label } from './label';
import { CustomButton } from './custom-button';

export const UserForm = ({
  title,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  onSubmitPress,
}: {
  title: string;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  onSubmitPress: () => unknown;
}) => (
  <FormContainer>
    <FormTitle>{title}</FormTitle>

    <Field>
      <Label>Correo Electrónico</Label>
      <CustomInput
        value={email}
        onChangeText={onEmailChange}
        placeholder="abrahams@audiassist.com"
      />
    </Field>
    <Field>
      <Label>Contraseña</Label>
      <CustomInput
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
      />
    </Field>
    <View style={styles.buttonContainer}>
      <CustomButton onPress={onSubmitPress} title="Continuar" />
    </View>
  </FormContainer>
);

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
});
