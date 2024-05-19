import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import { FormContainer } from '../components/form-container';
import { FormTitle } from '../components/form-title';
import { Field } from '../components/field';
import { Label } from '../components/label';
import { CustomInput } from '../components/custom-input';
import { CustomButton } from '../components/custom-button';
import { useState } from 'react';
import { Link } from 'expo-router';
import { client } from '../db/client';

export const Iniciarsesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text: string) => setEmail(text);
  const handlePasswordChange = (text: string) => setPassword(text);

  const handleSubmitPress = async () => {
    setIsLoading(true);

    const { error } = await client.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      const errorMessage =
        error.message === 'Invalid login credentials'
          ? 'Correo electrónico o contraseña incorrectos.'
          : 'Algo salió mal, reintente.';
      Alert.alert(errorMessage);
    }

    setIsLoading(false);
  };

  return (
    <View>
      <FormContainer>
        <FormTitle>Iniciar Sesión</FormTitle>

        <Field>
          <Label>Correo Electrónico</Label>
          <CustomInput
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
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
        <View style={styles.buttonContainer}>
          <CustomButton
            onPress={handleSubmitPress}
            loading={isLoading}
            title="Iniciar Sesión"
          />
        </View>
        <View style={styles.registerContainer}>
          <Link style={styles.registerLink} href="/registrarme">
            Registrarme
          </Link>
        </View>
      </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
  registerContainer: {
    marginTop: 24,
  },
  registerLink: {
    textAlign: 'center',
  },
});
