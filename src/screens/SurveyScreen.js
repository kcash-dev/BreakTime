import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';

import { useNavigation } from '@react-navigation/native';
import { fontSizes } from '../utils/Sizes';
import { db, currentUserUID } from '../api/Firebase';
import * as firebase from 'firebase';

export const SurveyScreen = () => {
    const navigation = useNavigation();
    
    async function noFocusFunc() {
        const incrementNoFocus = firebase.firestore.FieldValue.increment(1)

        await db
            .collection('users')
            .doc(currentUserUID)
            .update({
                notFocused: incrementNoFocus,
            })
            .then(() => console.log('Update sent! No focus!'))
        
        navigation.pop()
    }
    
    async function someFocusFunc() {
        const incrementSomeFocus = firebase.firestore.FieldValue.increment(1)

        await db
            .collection('users')
            .doc(currentUserUID)
            .update({
                somewhatFocused: incrementSomeFocus,
            })
            .then(() => console.log('Update sent! Some focus!'))
        
        navigation.pop()
    }
    
    async function vFocusFunc () {
        const incrementVeryFocus = firebase.firestore.FieldValue.increment(1)

        await db
            .collection('users')
            .doc(currentUserUID)
            .update({
                veryFocused: incrementVeryFocus,
            })
            .then(() => console.log('Update sent! Very focus!'))
        
        navigation.pop()
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