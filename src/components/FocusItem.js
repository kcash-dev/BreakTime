import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { colors } from '../utils/Colors';

import RNPickerSelect from 'react-native-picker-select';

export const FocusItem = () => {
    const [ focusItem, setFocusItem ] = useState('');
    const [ workTime, setWorkTime ] = useState(0);
    const [ breakTime, setBreakTime ] = useState(0);

    return (
        <View style={ styles.container }>
            { focusItem ?
            <View style={ styles.pickerContainer }>
                <Text style={ styles.pickerText }>How long would you like to focus?</Text>
                <RNPickerSelect
                    style={ pickerSelectStyles }
                    onValueChange={(value) => setWorkTime(value)}
                    items={[
                        { label: '25 minutes', value: '25 minutes' },
                        { label: '50 minutes', value: '50 minutes' },
                        { label: '75 minutes', value: '75 minutes' },
                        { label: '100 minutes', value: '100 minutes' },
                    ]}
                />
                <Text style={ styles.pickerText }>How long would you like to take a break?</Text>
                <RNPickerSelect
                    style={ pickerSelectStyles }
                    onValueChange={(value) => setBreakTime(value)}
                    items={[
                        { label: '5 minutes', value: '5 minutes' },
                        { label: '10 minutes', value: '10 minutes' },
                        { label: '15 minutes', value: '15 minutes' },
                        { label: '30 minutes', value: '30 minutes' },
                    ]}
                />
            </View>
            :
            <View> 
            <Text style={ styles.text }>Hello</Text>
            <Text style={ styles.text }>What would you like to focus on?</Text>
            <TextInput 
                onEndEditing={ (text) => setFocusItem(text) }
                style={ styles.textInput }
            />
            </View>
            }
            {
                focusItem && workTime && breakTime ? 
                <View>
                    
                </View>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: colors.white,
        width: '100%',
        padding: 18,
        borderRadius: 8,
        fontSize: 18
    },
    container: {
        width: '75%',
        shadowColor: colors.neonGreen,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    pickerText: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 18,
      paddingVertical: 7.5,
      paddingLeft: 5,
      borderColor: colors.neonGreen,
      borderBottomWidth: 1,
      borderRadius: 4,
      color: 'black',
      color: colors.black,
      backgroundColor: colors.white
    },
    inputAndroid: {
        fontSize: 18,
        paddingVertical: 7.5,
        paddingLeft: 5,
        borderColor: colors.neonGreen,
        borderBottomWidth: 1,
        borderRadius: 4,
        color: 'black',
        color: colors.black,
        backgroundColor: colors.white
    },
  });