import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';

import { useSelector } from 'react-redux'

export const TasksDone = () => {
    const tasks = useSelector(state => state.tasks)
    const taskDone = tasks.filter(item => item.done == true)
    return (
        <FlatList
            data={ taskDone }
            renderItem={({ item }) => (
                <TouchableOpacity
                    
                >
                    <Text>{item.task}</Text>
                </TouchableOpacity>
            )}
        />
    )
}