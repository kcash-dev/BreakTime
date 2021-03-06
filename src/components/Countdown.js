import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/Sizes';

// const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (timeEntered) => timeEntered < 10 ? `0${timeEntered}` : timeEntered;

export const Countdown = ({
    time,
    isStarted,
    onEnd,
    timer,
    setTimer,
    minutesToMillis,
    interval
}) => {
    const minute = Math.floor(timer / 1000 / 60) % 60;
    const seconds = Math.floor(timer / 1000) % 60;

    useEffect(() => {
        setTimer(minutesToMillis(time))
    }, [ time ])

   useEffect(() => {
    if (isStarted) {
        if(interval.current) clearInterval(interval.current)
        return;
    }
    interval.current = setInterval(onEnd, 1000)

    return () => clearInterval(interval.current)
   }, [ isStarted ])

    return(
        <View>
            <Text style={ styles.text }>{ formatTime(minute) }:{ formatTime(seconds) }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontSize: fontSizes.xxxl,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: colors.black, 
        textShadowOffset: { width: 0.5, height: 0.5 }, 
        textShadowRadius: 1,
    }
})