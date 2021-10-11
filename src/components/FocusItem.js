import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { colors } from '../utils/Colors';

import RNPickerSelect from 'react-native-picker-select';
import { ButtonComp } from './Button';
import { fontSizes, spacing } from '../utils/Sizes';

export const FocusItem = ({
    setFocusItem,
    setWorkTime,
    setIsFocusItem,
    workTime
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
                        { label: '25/5', value: { work: .5, break: .25 } },
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
        padding: spacing.md,
        borderRadius: 8,
        fontSize: fontSizes.md
    },
    container: {
        width: '75%',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    buttonContainer: {
        width: '100%',
        marginTop: spacing.lg
    },
    text: {
        color: colors.dark,
        textAlign: 'center',
        fontSize: fontSizes.md,
        fontWeight: 'bold',
        marginBottom: spacing.sm
    },
    pickerText: {
        color: colors.black,
        textAlign: 'center',
        fontSize: fontSizes.md,
        fontWeight: 'bold',
        marginVertical: spacing.md
    }
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: fontSizes.md,
      paddingVertical: spacing.sm,
      paddingLeft: spacing.sm,
      borderColor: colors.neonGreen,
      borderBottomWidth: 1,
      borderRadius: 4,
      color: 'black',
      color: colors.dark,
      backgroundColor: colors.white
    },
    inputAndroid: {
        fontSize: fontSizes.md,
        paddingVertical: spacing.sm,
        paddingLeft: spacing.sm,
        borderColor: colors.neonGreen,
        borderBottomWidth: 1,
        borderRadius: 4,
        color: 'black',
        color: colors.dark,
        backgroundColor: colors.white
    },
  });