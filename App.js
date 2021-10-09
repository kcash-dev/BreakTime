import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FocusItem } from './src/components/FocusItem';
import { colors } from './src/utils/Colors';
import { Timer } from './src/components/Timer';

export default function App() {

  const [ focusItem, setFocusItem ] = useState('');
  const [ workTime, setWorkTime ] = useState('');
  const [ isFocusItem, setIsFocusItem ] = useState(false);

  return (
    <View style={styles.container}>
      { focusItem && workTime ?
        <Timer 
          focusItem={ focusItem }
          workTime={ workTime.work }
          breakTime={ workTime.break }
          setFocusItem={ setFocusItem }
          setWorkTime={ setWorkTime }
          setIsFocusItem={ setIsFocusItem }
          isFocusItem={ isFocusItem }
        />
      :
        <FocusItem 
          setFocusItem={ setFocusItem }
          setWorkTime={ setWorkTime }
          setIsFocusItem={ setIsFocusItem }
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
