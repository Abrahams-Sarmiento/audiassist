import { Alert, View } from 'react-native';
import { UserForm, UserFormSubmit } from '../src/components/user-form';
import { client } from '../src/db/client';
import { router } from 'expo-router';

const CrearUsuario = () => {
  const handleSubmit: UserFormSubmit = async (values) => {
    const { data, error } = await client
      .from('users')
      .insert(values)
      .select()
      .single();

    if (error || !data) {
      Alert.alert('Algo salió mal, inténtelo nuevamente.');
      return;
    }

    router.replace(`/usuarios/${data.id}`);
  };

  return (
    <View>
      <UserForm
        title="Crear usuario"
        actionTitle="Crear usuario"
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default CrearUsuario;
