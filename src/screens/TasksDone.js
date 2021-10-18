import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, Pressable } from 'react-native';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/Sizes';

import { Feather } from '@expo/vector-icons';

import { deleteTask } from '../store/taskAction';
import { useSelector, useDispatch } from 'react-redux'

export const TasksDone = () => {
    const tasks = useSelector(state => state.tasks)
    const taskDone = tasks.filter(item => item.done == true);

    const dispatch = useDispatch();
    const foreverDeleteTask = (id) => dispatch(deleteTask(id));

    return (
        <SafeAreaView style={ styles.container }>
            <FlatList
                data={ taskDone }
                keyExtractor={ item => item.id }
                renderItem={({ item }) => (
                    <View style={ styles.itemContainer }>
                        <TouchableOpacity
                        
                        >
                            <Text>{item.task}</Text>
                        </TouchableOpacity>
                        <Pressable
                            style={({ pressed }) => [{
                                opacity: pressed ?
                                    0.5
                                    :
                                    1.0
                            }]}
                            onPress={() => foreverDeleteTask(item.id)}
                        >
                            <Feather name="x" size={fontSizes.xl} color={ colors.red } style={ styles.icon }/>
                        </Pressable>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    icon: {
        right: 10
    },
    itemContainer: {
        borderWidth: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    }
})