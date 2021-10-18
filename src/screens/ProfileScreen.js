import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import { colors } from '../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux'
import { removeTask } from '../store/taskAction';
import { fontSizes } from '../utils/Sizes';
import { ButtonComp } from '../components/Button';

import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const navigateDoneTasks = () => navigation.navigate('TasksDone');

    const tasks = useSelector(state => state.tasks);
    const data = tasks.filter((item) => item.done === false);
    const removeActiveTask = (id) => dispatch(removeTask(id));

    return (
        <View style={ styles.container }>
            <View style={ styles.textContainer }>
                <Text style={ styles.welcomeText }>
                    Welcome, name. Here are your focus details.
                </Text>
                <Image 
                    style={ styles.profileImage }
                    source={{ uri: 'https://i.imgur.com/MfVj0pW.png' }}
                />
            </View>
            <View style={ styles.dataContainer }>
                <FlatList
                    data={ tasks }
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={ styles.itemContainer }>
                            <Pressable
                                style={({ pressed }) => [{
                                    opacity: pressed ?
                                        0.5
                                        :
                                        1.0
                                }]}
                                // onPress={() => }
                            >
                                <Text style={ styles.itemText }>{item.task}</Text>
                            </Pressable>
                            { !tasks ? 
                                null
                                :
                                <View>
                                    { item.finished === true ? 
                                        <Text style={ styles.finishedText }>Finished</Text>
                                        :
                                        <Text style={ styles.unfinishedText }>Unfinished</Text>
                                    }
                                </View>
                            }
                            <Pressable
                                style={({ pressed }) => [{
                                    opacity: pressed ?
                                        0.5
                                        :
                                        1.0
                                }]}
                                onPress={() => removeActiveTask(item.id)}
                            >
                                <Feather name="x" size={fontSizes.xl} color={ colors.red } style={ styles.icon }/>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
            <View style={ styles.buttonContainer }>
                <ButtonComp name="Task History" callback={ navigateDoneTasks } />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        flex: 1
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        width: '100%'
    },
    dataContainer: {
        alignContent: 'center',
        height: '60%'
    },
    profileImage: {
        height: 50,
        width: 50,
        right: 10
    },
    welcomeText: {
        left: 10,
        fontWeight: 'bold'
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
    itemText: {
        fontSize: fontSizes.xl,
        left: 10
    },
    icon: {
        right: 10
    },
    finishedText: {
        color: colors.green
    },
    unfinishedText: {
        color: colors.red
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center'
    }
})