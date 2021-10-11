import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, Vibration, Image } from 'react-native';
import { useEffect } from 'react/cjs/react.development';
import { colors } from '../utils/Colors';
import { fontSizes, spacing } from '../utils/Sizes';
import { ButtonComp, ControlButtonComp } from './Button';
import { Countdown } from './Countdown';

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

    const setPlayPause = () => {
        if(isStarted) {
            setIsStarted(false)
        } else if (!isStarted) {
            setIsStarted(true)
        }
    }

    console.log(howManyFocuses)

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
        if (workTimeOver === false && howManyFocuses < 4) {
            vibrate()
            setTime(breakTime)
            setWorkTimeOver(true)
            setHowManyFocuses(howManyFocuses + 1)
        } else if (workTimeOver === true) {
            vibrate();
            setTime(workTime)
            setWorkTimeOver(false)
        } else if (workTimeOver === false && howManyFocuses === 4) {
            setTime(10)
            setWorkTimeOver(true)
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
            {!workTimeOver ? 
                <View>
                    <Text style={ styles.text }>You are focusing on:</Text>
                    <Text style={ styles.focusText }>{ focusItem }</Text>
                </View>
                :
                null
            }
            <View style={ styles.buttonContainer }>
                <ControlButtonComp name="Pause" altName="Start" callback={ setPlayPause } isPlaying={ isStarted }/>
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
                <Text style={ styles.text }>{ howManyFocuses }</Text>
            }
            {
                howManyFocuses === 4 ? 
                <View>
                    <Image 
                        source={{uri: 'https://i.imgur.com/IKUnOKf.gifv'}} 
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
        width: 100,
        height: 100
    }
})