import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomInput } from './custom-input';
import { Field } from './field';
import { FormContainer } from './form-container';
import { FormTitle } from './form-title';
import { Label } from './label';
import { CustomButton } from './custom-button';
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';

export type UserFormSubmit = (values: {
  email: string;
  password: string;
  role: string;
}) => Promise<unknown>;

export const UserForm = ({
  title,
  actionTitle,
  onSubmit,
  onDelete,
  initialEmail = '',
  initialPassword = '',
  initialRole = '',
}: {
  title: string;
  actionTitle: string;
  onSubmit: UserFormSubmit;
  onDelete?: () => unknown;
  initialEmail?: string;
  initialPassword?: string;
  initialRole?: string;
  showRolePicker?: boolean;
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [role, setRole] = useState(initialRole);
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (value: string) => setPassword(value);
  const handleSubmitPress = async () => {
    setIsLoading(true);

    await onSubmit({ email, password, role });

    setIsLoading(false);
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>

      <Field>
        <Label>Correo Electrónico</Label>
        <CustomInput
          value={email}
          onChangeText={handleEmailChange}
          placeholder="abrahams@audiassist.com"
        />
      </Field>
      <Field>
        <Label>Contraseña</Label>
        <CustomInput
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
      </Field>
      <Field>
        <Label>Rol</Label>
        <CheckBox
          containerStyle={styles.checkbox}
          checked={role === 'doctor'}
          onPress={() => setRole('doctor')}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          uncheckedIcon="radiobox-blank"
          title="Médico"
        />
        <CheckBox
          containerStyle={styles.checkbox}
          checked={role === 'patient'}
          onPress={() => setRole('patient')}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          uncheckedIcon="radiobox-blank"
          title="Paciente"
        />
      </Field>
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={isLoading}
          onPress={handleSubmitPress}
          title={actionTitle}
        />
      </View>
      {onDelete ? (
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>
            <Icon name="trash" size={24} color="red" /> Eliminar
          </Text>
        </Pressable>
      ) : null}
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
  deleteButton: {
    marginTop: 24,
  },
  deleteText: {
    textAlign: 'center',
    color: 'red',
  },
  checkbox: {
    margin: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});
