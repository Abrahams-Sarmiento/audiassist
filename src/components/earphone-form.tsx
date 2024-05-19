import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomInput } from './custom-input';
import { Field } from './field';
import { FormContainer } from './form-container';
import { FormTitle } from './form-title';
import { Label } from './label';
import { CustomButton } from './custom-button';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';

export type EarphoneFormSubmit = (values: {
  model: string;
  info: string;
  bte: boolean;
}) => Promise<unknown>;

export const EarphoneForm = ({
  title,
  actionTitle,
  onSubmit,
  onDelete,
  initialModel = '',
  initialInfo = '',
  initialBTE = false,
}: {
  actionTitle: string;
  title: string;
  onSubmit: EarphoneFormSubmit;
  initialModel?: string;
  initialInfo?: string;
  initialBTE?: boolean;
  onDelete?: () => unknown;
}) => {
  const [model, setModel] = useState(initialModel);
  const [info, setInfo] = useState(initialInfo);
  const [hasBTE, setHasBTE] = useState(initialBTE);
  const [isLoading, setIsLoading] = useState(false);
  const handleModelChange = (value: string) => setModel(value);
  const handleInfoChange = (value: string) => setInfo(value);
  const handleSubmitPress = async () => {
    setIsLoading(true);

    await onSubmit({ model, info, bte: hasBTE });

    setIsLoading(false);
  };
  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>

      <Field>
        <Label>Modelo</Label>
        <CustomInput
          value={model}
          onChangeText={handleModelChange}
          placeholder="Stride P Dura 600"
        />
      </Field>
      <Field>
        <Label>Información</Label>
        <CustomInput
          value={info}
          onChangeText={handleInfoChange}
          placeholder="Audífono con batería..."
        />
      </Field>
      <Field>
        <CheckBox
          containerStyle={styles.checkbox}
          checked={hasBTE}
          onPress={() => setHasBTE((bte) => !bte)}
          title="BTE"
        />
      </Field>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={handleSubmitPress}
          loading={isLoading}
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
  checkbox: {
    margin: 0,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  deleteButton: {
    marginTop: 24,
  },
  deleteText: {
    textAlign: 'center',
    color: 'red',
  },
});
