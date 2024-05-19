import { useEffect, useState } from 'react';
import { Alert, Text } from 'react-native';
import { client } from '../../../src/db/client';
import { router, useLocalSearchParams } from 'expo-router';
import {
  CalendarForm,
  CalendarFormSubmit,
} from '../../../src/components/calendar-form';

const EditarCalendario = () => {
  const { id } = useLocalSearchParams();
  const [calendar, setCalendar] = useState<{
    id: number;
    user: { id: string; email: string };
    earphone: { id: string; model: string };
  } | null>(null);
  const handleSubmit: CalendarFormSubmit = async (values) => {
    await client.from('calendars').update(values).eq('id', id);

    // todo: add notification when updated
  };
  const handleDelete = () => {
    Alert.alert('Eliminar calendario', '¿Está seguro que desea eliminar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await client.from('calendars').delete().eq('id', id);
          router.replace('/listado-calendarios');

          // todo: add notification when removed;
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      const { data, error } = await client
        .from('calendars')
        .select('id, users(id, email), earphones(id, model)')
        .eq('id', id)
        .single();

      const formattedData = {
        id: data!.id,
        user: {
          id: (data!.users as any).id,
          email: (data!.users as any).email,
        },
        earphone: {
          id: (data!.earphones as any).id,
          model: (data!.earphones as any).model,
        },
      };

      setCalendar(formattedData);
    };

    fetchCalendar();
  }, [id]);

  return calendar ? (
    <CalendarForm
      title="Editar calendario"
      actionTitle="Guardar cambios"
      initialUserId={calendar.user.id}
      initialEarphoneId={calendar.earphone.id}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  ) : (
    <Text>Cargando...</Text>
  );
};

export default EditarCalendario;
