import { Alert, View } from 'react-native';
import { UserForm } from '../src/components/user-form';
import { useState } from 'react';

const CrearUsuario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (value: string) => setPassword(value);
  const handleSubmitPress = () => {
    setIsLoading(true);

    Alert.alert('Creating user');

    setIsLoading(false);
  };

  return (
    <View>
      <UserForm
        title="Crear usuario"
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmitPress={handleSubmitPress}
      />
    </View>
  );
};

export default CrearUsuario;
