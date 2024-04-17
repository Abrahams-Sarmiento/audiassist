import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export const FormContainer = ({ children }: { children: ReactNode}) => <View style={styles.container}>
  {children}
</View>

const styles = StyleSheet.create({
  container: {
    paddingVertical: 64,
    paddingHorizontal: 32,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  }
})