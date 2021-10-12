import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, Vibration, Image } from 'react-native';
import { colors } from '../utils/Colors';
import { fontSizes, spacing } from '../utils/Sizes';
import { ButtonComp, ControlButtonComp } from './Button';
import { Countdown } from './Countdown';
import { FontAwesome } from '@expo/vector-icons';

export const Timer = ({
    focusItem, 
    setFocusItem, 
    setWorkTime, 
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

    let icon;

    const setIcon = () => {
        if (totalFocusBlocks === 0) {
               icon = <FontAwesome name="battery-empty" size={24} color="black" />
        } else if (totalFocusBlocks === .25) {
               icon = <FontAwesome name="battery-quarter" size={24} color="black" />
        } else if (totalFocusBlocks === .5) {
                icon = <FontAwesome name="battery-half" size={24} color="black" />
        } else if (totalFocusBlocks === .75) {
                icon = <FontAwesome name="battery-three-quarters" size={24} color="black" />
        } else if (totalFocusBlocks === 1) {
               icon = <FontAwesome name="battery-full" size={24} color="black" />
        }
    }

    useEffect(() => {
        setIcon()
    }, [ isStarted ])

    const onEnd = () => {
        setIsStarted(false)
        if (workTimeOver === false && howManyFocuses < 3 && workTime === .25) {
            vibrate()
            setTime(breakTime)
            setWorkTimeOver(true)
            setHowManyFocuses(howManyFocuses + 1)
            setTotalFocusBlocks(totalFocusBlocks + .25)
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
        } else if (workTimeOver === false && howManyFocuses < 3 && workTime === .50) {
            vibrate()
            setTime(breakTime)
            setWorkTimeOver(true)
            setHowManyFocuses(howManyFocuses + 2)
            setTotalFocusBlocks(totalFocusBlocks + .5)
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
        }
    }

    const handleSetters = () => {
        setFocusItem(null)
        setWorkTime('')
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
                    <Text style={ styles.focusText }>{ focusItem }</Text>
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
            {workTimeOver ? 
                <View>
                    <Text style={ styles.text }>TAKE A BREAK!</Text>
                </View>
                :
                <Text style={ styles.text }>{ icon }</Text>
            }
            { howManyFocuses === 4 && howManyBreaks === 3 && workTime === 25 || howManyFocuses === 4 && howManyBreaks === 2 && workTime === 50 ?
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
        marginTop: 100,
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