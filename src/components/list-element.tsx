import { ReactNode, useId } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const ListElement = ({
  children,
  actions = [],
}: {
  children: ReactNode;
  actions?: { label: string; onPress: () => unknown }[];
}) => {
  const id = useId();
  return (
    <View style={styles.listElement}>
      <Text style={styles.listElementText}>{children}</Text>
      <View style={styles.actions}>
        {actions.map((action, index) => (
          <Pressable style={styles.actionItem} key={`${id}-${index}`} onPress={action.onPress}>
            <Text>{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listElement: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d9d9d9',
    marginBottom: 12,
    padding: 12,
  },
  listElementText: {
    color: '#444',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionItem: {
    paddingHorizontal: 8,
    paddingTop: 12,
  }
});
