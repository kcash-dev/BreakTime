import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { colors } from '../utils/Colors';

import RNPickerSelect from 'react-native-picker-select';
import { ButtonComp } from './Button';

export const FocusItem = ({
    setFocusItem,
    setWorkTime,
    setBreakTime,
    setIsFocusItem
}) => {
    const [ focus, setFocus ] = useState(null);
    const [ work, setWork ] = useState(0);
    const [ item, setItem ] = useState(false);
    

    console.log(item)

    const handleSetters = () => {
        setFocusItem(focus)
        setWorkTime(work)
        setIsFocusItem(true)
    }

    return (
        <View style={ styles.container }>
            { item ?
            <View style={ styles.pickerContainer }>
                <Text style={ styles.pickerText }>How long would you like to focus?</Text>
                <RNPickerSelect
                    style={ pickerSelectStyles }
                    onValueChange={(value) => setWork(value)}
                    items={[
                        { label: '25/5', value: { work: 25, break: 5 } },
                        { label: '50/10', value: { work: 50, break: 10 } }
                    ]}
                />
                <View
                    style={ styles.buttonContainer }
                >
                    <ButtonComp 
                        name="Submit"
                        callback={ () => handleSetters() }
                    />
                </View>
            </View>
            :
            <View> 
            <Text style={ styles.text }>Hello</Text>
            <Text style={ styles.text }>What would you like to focus on?</Text>
                <TextInput 
                    onChangeText={ setFocus }
                    style={ styles.textInput }
                />
                <View
                    style={ styles.buttonContainer }
                >
                    <ButtonComp 
                        name="Submit"
                        callback={ () => setItem(true) }
                    />
                </View>
            </View>
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
    buttonContainer: {
        width: '100%',
        marginTop: 20
    },
    text: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    pickerText: {
        color: colors.black,
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