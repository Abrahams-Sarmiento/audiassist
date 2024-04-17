import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export const Field = ({ children }: { children : ReactNode}) => (
  <View style={styles.field}>
    {children}
  </View>
)

const styles = StyleSheet.create({
  field: {
    marginBottom: 16,
  }
})