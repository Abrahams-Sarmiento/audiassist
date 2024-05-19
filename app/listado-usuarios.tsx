import { Text, View } from 'react-native';
import { FormTitle } from '../src/components/form-title';
import { FormContainer } from '../src/components/form-container';
import { Field } from '../src/components/field';
import { ListElement } from '../src/components/list-element';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { client } from '../src/db/client';

const ListadoUsuarios = () => {
  const [users, setUsers] = useState<{ id: number; email: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await client.from('users').select('id, email');

      setUsers(data || []);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <FormTitle>Lista de usuarios </FormTitle>
      <Link href="/crear-usuario">Crear usuario</Link>
      <FormContainer>
        <Field>
          {isLoading ? <Text>Cargando...</Text> : null}
          {users.length === 0 && !isLoading ? (
            <Text>No existen usuarios</Text>
          ) : null}
          {users.map((user) => (
            <ListElement key={`earphone-${user.id}`}>
              <Link href={`/usuarios/${user.id}`}>{user.email}</Link>
            </ListElement>
          ))}
        </Field>
      </FormContainer>
    </View>
  );
};

export default ListadoUsuarios;
