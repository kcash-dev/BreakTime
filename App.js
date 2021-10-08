import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FocusItem } from './src/components/FocusItem';
import { colors } from './src/utils/Colors';

export default function App() {
  return (
    <View style={styles.container}>
      <FocusItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
