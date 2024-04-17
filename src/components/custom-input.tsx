import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';

export const CustomInput = (props: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event: any) => {
    setIsFocused(true);
    props.onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    props.onBlur?.(event);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={isFocused ? styles.focusedInput : styles.input}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </SafeAreaView>
  );
};

const baseStyles = {
  input: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    color: '#444',
  },
} as const;

const styles = StyleSheet.create({
  ...baseStyles,
  focusedInput: {
    ...baseStyles.input,
    borderColor: '#444',
  },
});
