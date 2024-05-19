import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { client } from '../../../src/db/client';
import { useLocalSearchParams } from 'expo-router';
import { CalendarUI } from '../../../src/components/calendar-ui';

const VerCalendario = () => {
  const { id } = useLocalSearchParams();
  const [calendar, setCalendar] = useState<{
    id: number;
    user: { id: string; email: string };
    earphone: { id: string; model: string };
  } | null>(null);

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

  return calendar ? <CalendarUI /> : <Text>Cargando...</Text>;
};

export default VerCalendario;
