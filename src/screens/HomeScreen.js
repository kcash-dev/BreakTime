import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FocusItem } from '../components/FocusItem'
import { colors } from '../utils/Colors';
import { Timer } from '../components/Timer';

export const HomeScreen = () => {

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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});