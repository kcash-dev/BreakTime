import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import { FocusItem } from '../components/FocusItem'
import { colors } from '../utils/Colors';
import { Timer } from '../components/Timer';

import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../store/taskAction';

export const HomeScreen = () => {
  const [ workTime, setWorkTime ] = useState('');
  const [ isFocusItem, setIsFocusItem ] = useState(false);

  const dispatch = useDispatch();
  const submitTask = (text) => dispatch(addTask(text));

  const tasks = useSelector(state => state.tasks)
  console.log(tasks)

  let focusItem;

  if (!tasks.length) {
    focusItem = null;
  } else {
    if(tasks.filter(item => item.done === false)) {
      focusItem = tasks.filter(item => item.done === false)
    }
  }

  return (
    <SafeAreaView style={ styles.container }>
      { isFocusItem ?
          <Timer
            focusItem={ focusItem }
            workTime={ workTime.work }
            breakTime={ workTime.break }
            setFocusItem={ submitTask }
            setWorkTime={ setWorkTime }
            setIsFocusItem={ setIsFocusItem }
            isFocusItem={ isFocusItem }
          />
        :
          <FocusItem 
            setTask={ submitTask }
            setWorkTime={ setWorkTime }
            setIsFocusItem={ setIsFocusItem }
          />
      }
    </SafeAreaView>
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