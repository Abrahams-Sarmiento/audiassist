import { StyleSheet, View } from "react-native";
import { Text, TextProps } from "react-native-elements";

export const Label = (props: TextProps) => (
  <View>
    <Text style={styles.label} {...props} />
  </View>
)

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  }
})