import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ListElement = ({ children }: { children: ReactNode }) => (
  <View style={styles.listElement}>
    <Text style={styles.listElementText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  listElement: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 12,
    padding: 12,
  },
  listElementText: {
    color: '#444'
  }
});
