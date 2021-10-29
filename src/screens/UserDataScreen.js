import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList, SafeAreaView, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/taskAction';
import { ButtonComp } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/Sizes';
import { auth, currentUserUID, db, handleSignOut } from '../api/Firebase'
import { useEffect } from 'react';

export const UserDataScreen = () => {
    const [ username, setUsername ] = useState('')
    const [ tasks, setTasks ] = useState([])
    const dispatch = useDispatch();
    const clearStateLogout = () => dispatch(logout())

    function logoutUser() {
        clearStateLogout();
        handleSignOut();
    }

    useEffect(() => {
        const unsubscribe = auth
        .onAuthStateChanged(user => {
            if (!user) {
                navigation.navigate('Login')
            }
        })

        return unsubscribe;
    }, [])

    async function getUserInfo() {
        let doc = await db
        .collection('users')
        .doc(currentUserUID)
        .get();

        if(!doc.exists) {
            Alert.alert('No user data found!')
        } else {
            let dataObj = doc.data();
            setUsername(dataObj.firstName)
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    const listening = db.collection('users').doc(currentUserUID).collection('tasks');
    const observer = listening.onSnapshot(docSnapshot => {
        return;
    }, err => {
        console.log(err)
    })

    async function getUserTasks() {
        let doc = await db
            .collection('users')
            .doc(currentUserUID)
            .get()

            const taskList = doc.data().tasks
            setTasks(taskList)
    }

    useEffect(() => {
        getUserTasks()
    }, [ observer ])

    const navigation = useNavigation();
    const navigateDoneTasks = () => navigation.navigate('TasksDone');

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.textContainer }>
                <Text style={ styles.welcomeText }>
                  { username }, here's what you focused on today.
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
                        </View>
                    )}
                />
            </View>
            <View style={ styles.buttonContainer }>
                <ButtonComp name="Task History" callback={ navigateDoneTasks } />
            </View>
            <View style={[ styles.buttonContainer, { marginTop: 40 } ]}>
                <ButtonComp name="Sign Out" callback={ logoutUser }/>
            </View>
        </SafeAreaView>
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
