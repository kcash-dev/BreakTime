import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Vibration, Image, Alert } from 'react-native';
import { colors } from '../utils/Colors';
import { fontSizes, spacing } from '../utils/Sizes';
import { ButtonComp, ControlButtonComp } from './Button';
import { Countdown } from './Countdown';

import { useNavigation } from '@react-navigation/native';
import { addTask, currentUserUID, db } from '../api/Firebase';

export const Timer = ({
    focusItem,
    setIsFocusItem,
    workTime,
    breakTime
}) => {
    const [ focusInfo, setFocusInfo ] = useState({
        time: workTime,
        isStarted: false,
        workTimeOver: false,
        howManyFocuses: 0,
        howManyBreaks: 0,
        totalFocusBlocks: 0,
        focus: focusItem
    })
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        async function fetchData() {
            let doc = await db
            .collection('users')
            .doc(currentUserUID)
            .get()
        
            const token = doc.data().expoToken
            setExpoPushToken(token)
        }

        fetchData()

        return () => {
            return;
        }
    }, [])

    const navigation = useNavigation();

    //COUNTDOWN INFO
    const interval = React.useRef(null)
    const [ timer, setTimer ] = useState(minutesToMillis(focusInfo.time));
    function minutesToMillis(min) {
        const time = min * 1000 * 60;
        return time;
    }

    const onEnd = () => {
        setFocusInfo({ ...focusInfo, isStarted: false })
        if (focusInfo.workTimeOver === false && focusInfo.howManyFocuses < 3 && workTime === .25) {
            vibrate()
            setFocusInfo({ 
                ...focusInfo, 
                time: breakTime, 
                workTimeOver: true, 
                howManyFocuses: focusInfo.howManyFocuses + 1, 
                totalFocusBlocks: focusInfo.totalFocusBlocks + .25,
                isStarted: false
            })
            navigation.navigate('Survey')
        } else if (focusInfo.workTimeOver === true && workTime === .25) {
            vibrate();
            setFocusInfo({ 
                ...focusInfo, 
                time: workTime, 
                workTimeOver: false,
                howManyBreaks: focusInfo.howManyBreaks + 1,
                isStarted: false
            })
        } else if (focusInfo.workTimeOver === false && focusInfo.howManyFocuses === 3 && focusInfo.howManyBreaks === 3 && workTime === .25) {
            vibrate();
            setFocusInfo({ 
                ...focusInfo, 
                time: 10, 
                workTimeOver: true, 
                howManyFocuses: 0,
                howManyBreaks: 0, 
                totalFocusBlocks: focusInfo.totalFocusBlocks + .25,
                isStarted: false
            })
            navigation.navigate('Survey')
        } else if (focusInfo.workTimeOver === false && focusInfo.howManyFocuses < 2 && workTime === .50) {
            vibrate()
            setFocusInfo({ 
                ...focusInfo, 
                time: breakTime, 
                workTimeOver: true, 
                howManyFocuses: focusInfo.howManyFocuses + 2, 
                totalFocusBlocks: focusInfo.totalFocusBlocks + .5,
                isStarted: false
            })
            navigation.navigate('Survey')
        } else if (focusInfo.workTimeOver === true && workTime === .50) {
            vibrate();
            setFocusInfo({ 
                ...focusInfo, 
                time: workTime, 
                workTimeOver: false, 
                howManyBreaks: focusInfo.howManyBreaks + 2,
                isStarted: false
            })
        } else if (focusInfo.workTimeOver === false && focusInfo.howManyFocuses === 2 && focusInfo.howManyBreaks === 2 && workTime === .50) {
            vibrate()
            setFocusInfo({ 
                ...focusInfo, 
                time: 20, 
                workTimeOver: true, 
                howManyFocuses: 0,
                howManyBreaks: 0,
                totalFocusBlocks: focusInfo.totalFocusBlocks + .5,
                isStarted: false
            })
            navigation.navigate('Survey')
        }
    }

        // DECREASE CLOCK
    const decrementTime = () => {
        setTimer((times) => {
            let title;
            let body;
            if(times === 0) {
                clearInterval(interval.current)
                onEnd();
                if (focusInfo.workTimeOver === true) {
                    title = 'Time to get back to work!'
                    body = 'Break time is over! Lets get back to grinding.'
                } else if (focusInfo.workTimeOver === false) {
                    title = 'Take a break!'
                    body = 'Great job! Lets take a break and recharge.'
                }
                sendPushNotification(expoPushToken, title, body)
                return times;
            }
            const timeLeft = times - 1000;
            return timeLeft;
        })
    }
    
        //IF FOCUS FINISHED
    function changeFocusFinished() {
        const time = focusInfo.totalFocusBlocks * workTime
        setFocusInfo(() => { 
            focusInfo.focus.done = true,
            focusInfo.focus.finished = true
        })
        addTask(time, focusInfo.focus)
    }

        //IF FOCUS UNFINISHED
    function changeFocusNotFinished() {
        const time = focusInfo.totalFocusBlocks * workTime
        setFocusInfo(() => { 
            focusInfo.focus.done = true
        })
        addTask(time, focusInfo.focus)
    }

    const handleSetters = () => {
        if (focusInfo.howManyFocuses > 0) {
            changeFocusFinished()
            
        } else {
            changeFocusNotFinished()
        }
        setIsFocusItem(false)
    }
    
    //PLAY/PAUSE
    const setPlayPause = () => {
        if(focusInfo.isStarted) {
            setFocusInfo({ ...focusInfo, isStarted: false })
        } else if (!focusInfo.isStarted) {
            setFocusInfo({ ...focusInfo, isStarted: true })
        }
    }


    // VIBRATE
    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000)
        } else {
            Vibration.vibrate(10000)
        }
    }

    return (
        <View style={ styles.timerContainer }>
            <View>
                <Countdown
                    time={ focusInfo.time }
                    isStarted={ !focusInfo.isStarted }
                    onEnd={ decrementTime }
                    timer={ timer }
                    setTimer={ setTimer }
                    minutesToMillis={ minutesToMillis }
                    interval={ interval }
                />
            </View>
            { !focusInfo.workTimeOver ? 
                <View>
                    <Text style={ styles.text }>You are focusing on:</Text>
                    <Text style={ styles.focusText }>{ focusInfo.focus.task }</Text>
                </View>
                :
                null
            }
            <View style={ styles.buttonContainer }>
                <ControlButtonComp 
                    name="Pause" 
                    altName="Start" 
                    callback={ setPlayPause } 
                    isPlaying={ focusInfo.isStarted }
                />
            </View>
            <View
                style={ styles.restartButtonContainer }
            >
                <ButtonComp 
                    name='Restart' 
                    callback={ handleSetters }
                />
            </View>
            { focusInfo.workTimeOver ? 
                <View>
                    <Text style={ styles.text }>TAKE A BREAK!</Text>
                </View>
                :
                null
            }
            { focusInfo.howManyFocuses === 0 && focusInfo.howManyBreaks === 0 && focusInfo.workTimeOver === true ?
                <View style={ styles.imageContainer }>
                    <Image 
                        source={{uri: 'https://i.imgur.com/aON4CyZ.jpg'}} 
                        style={ styles.image }
                    />
                </View>
                :
                null
            }
        </View>
    )
}

async function sendPushNotification(expoPushToken, title, body) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: title,
      body: body
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}
  


const styles = StyleSheet.create({
    timerContainer: {
        flex: 1
    },
    text: {
        color: colors.black,
        textAlign: 'center'
    },
    focusText: {
        color: colors.secondary,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSizes.xl,
        textShadowColor: colors.black, 
        textShadowOffset: { width: 0.5, height: 0.5 }, 
        textShadowRadius: 1,
    },
    buttonContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: spacing.lg,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    restartButtonContainer: {
        position: 'absolute',
        bottom: spacing.xxl,
        alignSelf: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center'
    },
    imageContainer: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center'
    }
})