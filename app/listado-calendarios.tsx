import { Text, View } from 'react-native';
import { FormTitle } from '../src/components/form-title';
import { FormContainer } from '../src/components/form-container';
import { Field } from '../src/components/field';
import { ListElement } from '../src/components/list-element';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { client } from '../src/db/client';

const ListadoCalendarios = () => {
  const [calendars, setCalendars] = useState<
    {
      id: number;
      user: { id: string; email: string };
      earphone: { id: string; model: string };
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalendars = async () => {
      const { data, error } = await client
        .from('calendars')
        .select('id, users(id, email), earphones(id, model)');

      const formattedData = (data || []).map((entry) => ({
        id: entry.id,
        user: {
          id: (entry.users as any).id,
          email: (entry.users as any).email,
        },
        earphone: {
          id: (entry.earphones as any).id,
          model: (entry.earphones as any).model,
        },
      }));

      setCalendars(formattedData);
      setIsLoading(false);
    };

    fetchCalendars();
  }, []);
  return (
    <View>
      <FormTitle>Lista de calendarios </FormTitle>
      <Link href="/crear-calendario">Crear calendario</Link>
      <FormContainer>
        <Field>
          {isLoading ? <Text>Cargando...</Text> : null}
          {calendars.length === 0 && !isLoading ? (
            <Text>No existen calendarios</Text>
          ) : null}
          {calendars.map((calendar) => (
            <ListElement
              key={`calendar-${calendar.id}`}
              actions={[
                {
                  onPress: () => router.push(`/calendarios/${calendar.id}`),
                  label: 'Editar',
                },
                {
                  onPress: () => router.push(`/calendarios/${calendar.id}/ver`),
                  label: 'Ver agenda',
                },
              ]}
            >
              {calendar.user.email}
            </ListElement>
          ))}
        </Field>
      </FormContainer>
    </View>
  );
};

export default ListadoCalendarios;
