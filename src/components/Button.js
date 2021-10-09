import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../utils/Colors';

export const ButtonComp = ({ name, callback }) => {

    const handleFunc = () => {
        if (callback) {
            callback()
        }
    }

    return (
    <Pressable 
            style={({pressed}) => [{
                opacity: pressed ? 0.6 : 1.0
            }]
            }
            onPress={ handleFunc }
        >
            <Button mode="contained" style={ styles.button }>
                <Text style={ styles.buttonText }>{ name }</Text>
            </Button>
    </Pressable>
    )
};

export const ControlButtonComp = ({ name, altName, callback, isPlaying }) => {

    const handleFunc = () => {
        if (callback) {
            callback()
        }
    }

    return (
    <Pressable 
            style={({pressed}) => [{
                opacity: pressed ? 0.6 : 1.0
            }]
            }
            onPress={ handleFunc }
        >
            <Button mode="contained" style={ styles.playPause }>
                { isPlaying ? <Text style={ styles.buttonText }>{ name }</Text> : <Text style={ styles.buttonText }>{ altName }</Text>}
            </Button>
    </Pressable>
    )
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: colors.neonGreen,
        color: colors.black,
        shadowColor: colors.neonGreen,
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    },
    buttonText: {
      color: colors.black,
      fontWeight: 'bold'
    },
    playPause: {
        borderRadius: 50,
        width: '100%',
        height: '53%',
        alignSelf: 'center',
        backgroundColor: colors.neonGreen,
        color: colors.black,
        shadowColor: colors.neonGreen,
        shadowOffset: {
          width: 0,
          height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        justifyContent: 'center'
    }
})