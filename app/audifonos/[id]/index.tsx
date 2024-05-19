import { useEffect, useState } from 'react';
import {
  EarphoneForm,
  EarphoneFormSubmit,
} from '../../../src/components/earphone-form';
import { Alert, Text } from 'react-native';
import { client } from '../../../src/db/client';
import { router, useLocalSearchParams } from 'expo-router';

const EditarAudifono = () => {
  const { id } = useLocalSearchParams();
  const [earphone, setEarphone] = useState<{
    id: number;
    model: string;
    info: string;
    bte: boolean;
  } | null>(null);
  const handleSubmit: EarphoneFormSubmit = async (values) => {
    await client.from('earphones').update(values).eq('id', id);

    // todo: add notification when updated
  };
  const handleDelete = () => {
    Alert.alert('Eliminar audífono', '¿Está seguro que desea eliminar?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await client.from('earphones').delete().eq('id', id);
          router.replace('/listado-audifonos');

          // todo: add notification when removed;
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchEarphone = async () => {
      const { data } = await client
        .from('earphones')
        .select('*')
        .eq('id', id)
        .single();

      setEarphone(data);
    };

    fetchEarphone();
  }, [id]);

  return earphone ? (
    <EarphoneForm
      title="Editar audífono"
      actionTitle="Guardar cambios"
      initialModel={earphone.model}
      initialBTE={earphone.bte}
      initialInfo={earphone.info}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
    />
  ) : (
    <Text>Cargando...</Text>
  );
};

export default EditarAudifono;
