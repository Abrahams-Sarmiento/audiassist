import { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { client } from '../../../src/db/client';
import { router, useLocalSearchParams } from 'expo-router';
import { UserForm, UserFormSubmit } from '../../../src/components/user-form';

const EditarUsuario = () => {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<{
    id: number;
    email: string;
    password: string;
    role: string;
  } | null>(null);
  const handleSubmit: UserFormSubmit = async (values) => {
    await client.from('users').update(values).eq('id', id);

    // todo: add notification when updated
  };
  const handleDelete = () => {
    Alert.alert('Eliminar usuario', '¿Está seguro que desea eliminar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await client.from('users').delete().eq('id', id);
          router.replace('/listado-usuarios');

          // todo: add notification when removed;
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      setUser(data);
    };


    fetchUser();
  }, [id]);

  return user ? (
    <UserForm
      title="Editar usuario"
      actionTitle="Guardar cambios"
      initialEmail={user.email}
      initialPassword={user.password}
      initialRole={user.role}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      showRolePicker // todo: add role based permissions
    />
  ) : (
    <Text>Cargando...</Text>
  );
};

export default EditarUsuario;
