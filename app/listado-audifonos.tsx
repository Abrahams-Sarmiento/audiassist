import { Text, View } from 'react-native';
import { FormTitle } from '../src/components/form-title';
import { FormContainer } from '../src/components/form-container';
import { Field } from '../src/components/field';
import { ListElement } from '../src/components/list-element';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { client } from '../src/db/client';

const ListadoAudifonos = () => {
  const [earphones, setEarphones] = useState<{ id: number; model: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEarphones = async () => {
      const { data } = await client.from('earphones').select('id, model');

      setEarphones(data || []);
      setIsLoading(false);
    };

    fetchEarphones();
  }, []);
  return (
    <View>
      <FormTitle>Lista de audífonos </FormTitle>
      <Link href="/crear-audifono">Crear audífono</Link>
      <FormContainer>
        <Field>
          {isLoading ? <Text>Cargando...</Text> : null}
          {earphones.length === 0 && !isLoading ? (
            <Text>No existen audífonos</Text>
          ) : null}
          {earphones.map((earphone) => (
            <ListElement key={`earphone-${earphone.id}`}>
              <Link href={`/audifonos/${earphone.id}`}>{earphone.model}</Link>
            </ListElement>
          ))}
        </Field>
      </FormContainer>
    </View>
  );
};

export default ListadoAudifonos;
