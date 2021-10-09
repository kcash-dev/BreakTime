import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { colors } from '../utils/Colors';

export const ControlButton = ({ name, callback }) => {
    const [ isPlaying, setIsPlaying ] = useState(false)
    const handleFunc = () => {
        if (callback) {
            callback()
        }
    }

    return (
    <Pressable 
            style={({pressed}) => [{
                opacity: pressed ? 0.6 : 1.0
                },

            ]
            }
            onPress={ handleFunc, setIsPlaying(!isPlaying) }
        >
            <View style={ styles.playButton }>
                { isPlaying ? <Text>Pause</Text> : <Text>Start</Text> }
            </View>
    </Pressable>
    )
};

const styles = StyleSheet.create({
    playButton: {
        borderWidth: 1,
        borderColor: colors.white,
        borderRadius: 30
    }
})