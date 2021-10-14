import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';

import { useNavigation } from '@react-navigation/native';
import { fontSizes } from '../utils/Sizes';

export const SurveyScreen = ({ route }) => {
    // const [ noFocus, setNoFocus ] = useState(0);
    // const [ someFocus, setSomeFocus ] = useState(0);
    // const [ vFocus, setVFocus ] = useState(0);
    const navigation = useNavigation();

    const { handleNotFocusedPress, handleSomewhatFocusedPress, handleVeryFocusedPress } = route.params;

    
    const noFocusFunc = () => {
        handleNotFocusedPress();
        navigation.pop();
    }
    
    const someFocusFunc = () => {
        handleSomewhatFocusedPress();
        navigation.pop();
    }
    const vFocusFunc = () => {
        handleVeryFocusedPress()
        navigation.pop();
    }

    return (
        <View style={ styles.container }>
            <Text>How focused were you during that focus time?</Text>
            <View style={ styles.button }>
                <ButtonComp name='Not focused' callback={ noFocusFunc }/>
            </View>
            <View style={ styles.button }>
                <ButtonComp name='Somewhat focused' callback={ someFocusFunc }/>
            </View>
            <View style={ styles.button }>
                <ButtonComp name='Very focused' callback={ vFocusFunc }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    text: {
        fontSize: fontSizes.lg
    },
    button: {
        marginVertical: 10,
        width: '70%'
    }
})