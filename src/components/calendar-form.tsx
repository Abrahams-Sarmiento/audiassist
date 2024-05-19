import { Picker } from '@react-native-picker/picker';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Field } from './field';
import { FormContainer } from './form-container';
import { FormTitle } from './form-title';
import { Label } from './label';
import { CustomButton } from './custom-button';
import { useEffect, useState } from 'react';
import { client } from '../db/client';

export type CalendarFormSubmit = (values: {
  userId: string;
  earphoneId: string;
}) => Promise<unknown>;

export const CalendarForm = ({
  title,
  actionTitle,
  onSubmit,
  onDelete,
  initialUserId = '',
  initialEarphoneId = '',
}: {
  title: string;
  actionTitle: string;
  onSubmit: CalendarFormSubmit;
  onDelete?: () => unknown;
  initialUserId?: string;
  initialEarphoneId?: string;
}) => {
  const [data, setData] = useState<{
    users: { id: string; email: string }[];
    earphones: { id: string; model: string }[];
  }>({ users: [], earphones: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(initialUserId);
  const [earphoneId, setEarphoneId] = useState(initialEarphoneId);

  const handleSubmitPress = async () => {
    setIsLoading(true);

    await onSubmit({
      userId: userId || data.users[0].id,
      earphoneId: earphoneId || data.earphones[0].id,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [usersResponse, earphonesResponse] = await Promise.all([
        client.from('users').select('id, email').eq('role', 'patient'),
        client.from('earphones').select('id, model'),
      ]);

      const users = usersResponse.data || [];
      const earphones = earphonesResponse.data || [];

      setData({ users, earphones });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <Text>Cargando...</Text>
  ) : (
    <FormContainer>
      <FormTitle>{title}</FormTitle>

      <Field>
        <Label>Usuario</Label>
        {data.users.length === 0 ? (
          <Text>No existen usuarios</Text>
        ) : (
          <Picker
            selectedValue={userId}
            onValueChange={(itemValue) => setUserId(itemValue)}
          >
            {data.users.map((user) => (
              <Picker.Item
                key={`user-${user.id}`}
                label={user.email}
                value={user.id}
              />
            ))}
          </Picker>
        )}
      </Field>
      <Field>
        <Label>Audífono</Label>
        {data.earphones.length === 0 ? (
          <Text>No existen audífonos</Text>
        ) : (
          <Picker
            selectedValue={earphoneId}
            onValueChange={(itemValue) => setEarphoneId(itemValue)}
          >
            {data.earphones.map((earphone) => (
              <Picker.Item
                key={`user-${earphone.id}`}
                label={earphone.model}
                value={earphone.id}
              />
            ))}
          </Picker>
        )}
      </Field>
      <View style={styles.buttonContainer}>
        <CustomButton
          loading={isLoading}
          onPress={handleSubmitPress}
          title={actionTitle}
        />
      </View>
      {onDelete ? (
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>
            <Icon name="trash" size={24} color="red" /> Eliminar
          </Text>
        </Pressable>
      ) : null}
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
  deleteButton: {
    marginTop: 24,
  },
  deleteText: {
    textAlign: 'center',
    color: 'red',
  },
  checkbox: {
    margin: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});
