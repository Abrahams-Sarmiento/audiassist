import { StyleSheet, View } from "react-native";
import { Text, TextProps } from "react-native-elements";

export const FormTitle = (props: TextProps) => (
  <View>
    <Text style={styles.title} {...props}/>
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  }
})