import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, Pressable, Alert, Dimensions } from 'react-native';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/Sizes';

import { Feather } from '@expo/vector-icons';

import { db, currentUserUID, deleteTask } from '../api/Firebase';

import { PieChart } from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width

export const TasksDone = () => {
    const [ tasksDone, setTasksDone ] = useState([])
    const [ totalFocusTime, setTotalFocusTime ] = useState(0)
    const [ howFocused, setHowFocused ] = useState([])

    const navigation = useNavigation();

    const listening = db.collection('users').doc(currentUserUID).collection('tasks');
    const observer = listening.onSnapshot(docSnapshot => {
        return;
    }, err => {
        console.log(err)
    })

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
    }

    function goBack() {
        navigation.pop();
    }

    async function getDetails() {
        let doc = await db
        .collection('users')
        .doc(currentUserUID)
        .get()

        const focusTime = doc.data().totalFocusTime
        const noFocus = doc.data().notFocused
        const somewhatFocus = doc.data().somewhatFocused
        const veryFocus = doc.data().veryFocused

        if(!doc.exists) {
            Alert.alert('No data found!')
        } else {
            setTotalFocusTime(focusTime)
            setHowFocused([
                { name: 'Not Focused', number: noFocus, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#000', legendFontSize: 10 }, 
                { name: 'Somewhat Focused', number: somewhatFocus, color: '#F00', legendFontColor: '#000', legendFontSize: 10 }, 
                { name: 'Very Focused', number: veryFocus, color: 'rgb(0, 0, 255)', legendFontColor: '#000', legendFontSize: 10 }
            ])
        }
    }

    async function getUserTasks() {
        let doc = await db
            .collection('users')
            .doc(currentUserUID)
            .get()

            const taskList = doc.data().tasks
            setTasksDone(taskList)
    }

    useEffect(() => {
        getDetails();
    }, [])

    useEffect(() => {
      getUserTasks()  
    }, [ observer ])

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + " hour(s) and " + rminutes + " minute(s).";
    }

    let totalTime = timeConvert(totalFocusTime)

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
                                onPress={() => deleteTask(item.id)}
                            >
                                <Feather name="x" size={fontSizes.xl} color={ colors.red } style={ styles.icon }/>
                            </Pressable>
                        </View>
                    )}
                />
            </View>
            <View style={ styles.infoContainer }>
                <Text>Total Focus Time: { totalTime }</Text>
                <PieChart
                    data={ howFocused }
                    width={ screenWidth }
                    height={ 200 }
                    chartConfig={ chartConfig }
                    accessor="number"
                />
            </View>
            <View style={ styles.buttonContainer }>
                <ButtonComp name="Go Back"callback={ goBack }/>
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
        alignItems: 'center'
    },
    heading: {
        fontSize: fontSizes.xl,
        textAlign: 'center'
    },
    listContainer: {
        height: '40%',
        backgroundColor: colors.white,
    },
    infoContainer: {
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        height: '20%',
        width: '50%',
        alignSelf: 'center'
    }
})