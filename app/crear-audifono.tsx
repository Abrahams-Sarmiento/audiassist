import { Alert, View } from 'react-native';
import {
  EarphoneForm,
  EarphoneFormSubmit,
} from '../src/components/earphone-form';
import { client } from '../src/db/client';
import { router } from 'expo-router';

const CrearAudifono = () => {
  const handleSubmit: EarphoneFormSubmit = async ({ model, info, bte }) => {
    const { error, data } = await client
      .from('earphones')
      .insert({ model, info, bte })
      .select()
      .single();

    if (error || !data) {
      Alert.alert('Algo salió mal, inténtelo nuevamente.');
      return;
    }

    router.replace(`/audifonos/${data.id}`);
  };

  return (
    <View>
      <EarphoneForm
        title="Crear audífono"
        actionTitle="Crear audífono"
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default CrearAudifono;
