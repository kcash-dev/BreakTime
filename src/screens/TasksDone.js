import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, Pressable, Alert } from 'react-native';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/Sizes';

import { Feather } from '@expo/vector-icons';

import { deleteTask } from '../store/taskAction';
import { useSelector, useDispatch } from 'react-redux'

import { db, currentUserUID } from '../api/Firebase';

export const TasksDone = () => {
    const tasks = useSelector(state => state.tasks)
    const [ tasksDone, setTasksDone ] = useState([])

    const dispatch = useDispatch();
    const foreverDeleteTask = (id) => dispatch(deleteTask(id));

    useEffect(() => {
        async function getUserTasks() {
            let doc = await db
            .collection('users')
            .doc(currentUserUID)
            .get()

            const taskList = doc.data().tasks

            if(!doc.exists) {
                Alert.alert('No data found!')
            } else {
                setTasksDone(taskList)
            }

        }

        getUserTasks();
    }, [])

    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.heading }>Tasks Finished</Text>
            <View style={ styles.listContainer }>
                <FlatList
                    data={ tasksDone }
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
            </View>
            <View style={ styles.infoContainer }>
                
            </View>
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
    },
    heading: {
        fontSize: fontSizes.xl,
        textAlign: 'center'
    },
    listContainer: {
        height: '50%'
    },
    infoContainer: {
        height: '50%'
    }
})