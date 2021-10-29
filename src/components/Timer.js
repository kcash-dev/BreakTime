import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Vibration, Image, Alert } from 'react-native';
import { colors } from '../utils/Colors';
import { fontSizes, spacing } from '../utils/Sizes';
import { ButtonComp, ControlButtonComp } from './Button';
import { Countdown } from './Countdown';

import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux'
import { didTask, removeTask } from '../store/taskAction';
import { addTask } from '../api/Firebase';

export const Timer = ({
    focusItem,
    setIsFocusItem,
    workTime,
    breakTime
}) => {
    const [ time, setTime ] = useState(workTime);
    const [ isStarted, setIsStarted ] = useState(false);
    const [ workTimeOver, setWorkTimeOver ] = useState(false);
    const [ howManyFocuses, setHowManyFocuses ] = useState(0);
    const [ howManyBreaks, setHowManyBreaks ] = useState(0);
    const [ totalFocusBlocks, setTotalFocusBlocks ] = useState(0);
    const [ focus, setFocus ] = useState(focusItem)

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const finishTask = (id) => dispatch(didTask(id));
    const removeActiveTask = (id) => dispatch(removeTask(id));

    const setPlayPause = () => {
        if(isStarted) {
            setIsStarted(false)
        } else if (!isStarted) {
            setIsStarted(true)
        }
    }

    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000)
        } else {
            Vibration.vibrate(10000)
        }
    }

    const onEnd = () => {
        setIsStarted(false)
        if (workTimeOver === false && howManyFocuses < 3 && workTime === .25) {
            vibrate()
            setTime(breakTime)
            setWorkTimeOver(true)
            setHowManyFocuses(howManyFocuses + 1)
            setTotalFocusBlocks(totalFocusBlocks + .25)
            navigation.navigate('Survey')
        } else if (workTimeOver === true && workTime === .25) {
            vibrate();
            setTime(workTime)
            setWorkTimeOver(false)
            setHowManyBreaks(howManyBreaks + 1)
        } else if (workTimeOver === false && howManyFocuses === 3 && howManyBreaks === 3 && workTime === .25) {
            setTime(10)
            setWorkTimeOver(true)
            setHowManyFocuses(0)
            setHowManyBreaks(0)
            setTotalFocusBlocks(totalFocusBlocks + .25)
            navigation.navigate('Survey')
        } else if (workTimeOver === false && howManyFocuses < 2 && workTime === .50) {
            vibrate()
            setTime(breakTime)
            setWorkTimeOver(true)
            setHowManyFocuses(howManyFocuses + 2)
            setTotalFocusBlocks(totalFocusBlocks + .5)
            navigation.navigate('Survey')
        } else if (workTimeOver === true && workTime === .50) {
            vibrate();
            setTime(workTime)
            setWorkTimeOver(false)
            setHowManyBreaks(howManyBreaks + 2)
        } else if (workTimeOver === false && howManyFocuses === 2 && howManyBreaks === 2 && workTime === .50) {
            setTime(20)
            setWorkTimeOver(true)
            setHowManyFocuses(0)
            setHowManyBreaks(0)
            setTotalFocusBlocks(totalFocusBlocks + .5)
            navigation.navigate('Survey')
        }
    }

    function changeFocusFinished() {
        setFocus((focus) => {
            focus.done = true,
            focus.finished = true
        })
        addTask(time, focus)
    }

    function changeFocusNotFinished() {
        setFocus((focus) => {
            focus.done = true,
            focus.finished = false
        })
        addTask(time, focus)
    }

    const handleSetters = () => {
        const time = totalFocusBlocks * workTime
        if (howManyFocuses > 0) {
            changeFocusFinished()
            
        } else {
            changeFocusNotFinished()
        }
        setIsFocusItem(false)
    }

    return (
        <View style={ styles.timerContainer }>
            <View>
                <Countdown
                    time={ time }
                    isStarted={ !isStarted }
                    onEnd={ onEnd }
                />
            </View>
            { !workTimeOver ? 
                <View>
                    <Text style={ styles.text }>You are focusing on:</Text>
                    <Text style={ styles.focusText }>{ focus.task }</Text>
                </View>
                :
                null
            }
            <View style={ styles.buttonContainer }>
                <ControlButtonComp 
                    name="Pause" 
                    altName="Start" 
                    callback={ setPlayPause } 
                    isPlaying={ isStarted }
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
            { workTimeOver ? 
                <View>
                    <Text style={ styles.text }>TAKE A BREAK!</Text>
                </View>
                :
                null
            }
            { howManyFocuses === 0 && howManyBreaks === 0 && workTimeOver === true ?
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