import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { colors } from '../utils/Colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
    workTime,
    isStarted
}) => {
    const interval = React.useRef(null)
    const [ timer, setTimer ] = useState(minutesToMillis(workTime));
    const minute = Math.floor(timer / 1000 / 60) % 60;
    const seconds = Math.floor(timer / 1000) % 60;

    const decrementTime = () => {
        setTimer((timer) => timer - 1000)
    }

   useEffect(() => {
    if (isStarted) {
        if(interval.current) clearInterval(interval.current)
        return;
    }
    interval.current = setInterval(() => {
        decrementTime();
    }, 1000)
   }, [ isStarted ])

    return(
        <View>
            <Text style={ styles.text }>{ formatTime(minute) }:{ formatTime(seconds) }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.black,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})