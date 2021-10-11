import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/Sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
    time,
    isStarted,
    onEnd
}) => {
    const interval = React.useRef(null)
    const [ timer, setTimer ] = useState(minutesToMillis(time));
    const minute = Math.floor(timer / 1000 / 60) % 60;
    const seconds = Math.floor(timer / 1000) % 60;

    const decrementTime = () => {
        setTimer((time) => {
            if(time === 0) {
                clearInterval(interval.current)
                onEnd();
                return time;
            }
            const timeLeft = time - 1000;
            return timeLeft;
        })
    }

    useEffect(() => {
        setTimer(minutesToMillis(time))
    }, [ time ])

   useEffect(() => {
    if (isStarted) {
        if(interval.current) clearInterval(interval.current)
        return;
    }
    interval.current = setInterval(decrementTime, 1000)

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