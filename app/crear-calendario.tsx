import { Alert, View } from 'react-native';
import { client } from '../src/db/client';
import { router } from 'expo-router';
import {
  CalendarForm,
  CalendarFormSubmit,
} from '../src/components/calendar-form';
import { useUser } from '../src/context/user';

const CrearCalendario = () => {
  const { session } = useUser();
  const handleSubmit: CalendarFormSubmit = async (values) => {
    const { data, error } = await client
      .from('calendars')
      .insert({ ...values, ownerId: session?.user.id })
      .select()
      .single();

    console.log('payload', { ...values, ownerId: session?.user.id })

    if (error || !data) {
      console.log('create error', error);
      Alert.alert('Algo salió mal, inténtelo nuevamente.');
      return;
    }

    router.replace(`/calendarios/${data.id}`);
  };

  return (
    <View>
      <CalendarForm
        title="Crear calendario"
        actionTitle="Crear calendario"
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default CrearCalendario;
