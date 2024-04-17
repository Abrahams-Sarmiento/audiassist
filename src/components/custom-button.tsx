import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';

export const CustomButton = (props: ButtonProps) => (
  <SafeAreaView>
    <Button buttonStyle={styles.button} titleStyle={styles.title} {...props} />
  </SafeAreaView>
);

const baseStyles = {
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#ffd814',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 28,
  },
  title: {
    color: '#444',
    fontWeight: 'bold',
  },
} as const;

const styles = StyleSheet.create({
  ...baseStyles,
});
