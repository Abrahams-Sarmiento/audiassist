import { ScrollView, StyleSheet, View } from 'react-native';
import { Field } from './field';
import { Label } from './label';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { CustomButton } from './custom-button';
import { CheckBox } from 'react-native-elements';

export type AppointmentFormSubmit = (values: {
  type: string;
  location: string;
}) => Promise<unknown>;

export const AppointmentForm = ({
  typeId = 'maintenance',
  locationId = '1',
  onSubmit,
}: {
  typeId?: string;
  locationId?: string;
  onSubmit: AppointmentFormSubmit;
}) => {
  const [type, setType] = useState(typeId);
  const [location, setLocation] = useState(locationId);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);

    await onSubmit({ type, location });

    setIsLoading(false);
  };

  return (
    <ScrollView>
      <Field>
        <Label>Tipo de cita</Label>
        <CheckBox
          containerStyle={styles.checkbox}
          checked={type === 'maintenance'}
          onPress={() => setType('maintenance')}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          uncheckedIcon="radiobox-blank"
          title="Mantención"
        />
        <CheckBox
          containerStyle={styles.checkbox}
          checked={type === 'medicalAppointment'}
          onPress={() => setType('medicalAppointment')}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          uncheckedIcon="radiobox-blank"
          title="Control Médico"
        />
      </Field>

      <Field>
        <Label>Lugar de atención</Label>
        <CheckBox
          containerStyle={styles.checkbox}
          checked={location === '1'}
          onPress={() => setLocation('1')}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          uncheckedIcon="radiobox-blank"
          title="RedSalud Providencia"
        />
        <CheckBox
          containerStyle={styles.checkbox}
          checked={location === '2'}
          onPress={() => setLocation('2')}
          iconType="material-community"
          checkedIcon="radiobox-marked"
          uncheckedIcon="radiobox-blank"
          title="Integramédica Barcelona"
        />
      </Field>

      <View style={styles.buttonContainer}>
        <CustomButton
          loading={isLoading}
          title="Guardar"
          onPress={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 24,
  },
  checkbox: {
    margin: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
});
