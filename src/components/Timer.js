import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '../utils/Colors';
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
    const [ workMinutes, setWorkMinutes ] = useState(workTime);
    const [ breakMinutes, setBreakMinutes ] = useState(breakTime);
    const [ isStarted, setIsStarted ] = useState(false);
    const [ progress, setProgress ] = useState(1);

    const setPlayPause = () => {
        if(isStarted) {
            setIsStarted(false)
        } else if (!isStarted) {
            setIsStarted(true)
        }
    }

    const onEnd = () => {
        setWorkMinutes(workTime)
        setBreakMinutes(breakTime)
        setProgress(1)
        setIsStarted(false)
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
                    workTime={ workMinutes }
                    isStarted={ !isStarted }
                />
            </View>
            <View>
                <Text style={ styles.text }>You are focusing on:</Text>
                <Text style={ styles.focusText }>{ focusItem }</Text>
            </View>
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
        color: colors.black,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonContainer: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 20
    },
    restartButtonContainer: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
    }
})