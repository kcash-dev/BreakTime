import React, { useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Text, TextInput, Pressable } from 'react-native'
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';

const LoginScreen = () => {
    const [ isRegistered, setIsRegistered ] = useState(true)
    console.log(isRegistered)
    return (
        <KeyboardAvoidingView
            style={ styles.container }
            behavior="padding"
        >
           <View>
               <TextInput
                placeholder="Email"
                // value={}
                // onChangeText={text => }
                style={ styles.input }
               />
               <TextInput
                placeholder="Password"
                // value={}
                // onChangeText={text => }
                style={ styles.input }
                secureTextEntry
               />
           </View>
           {
               isRegistered ? 
               <View>
                   <ButtonComp name="Login" />
                    <Pressable
                        style={({ pressed }) => ({
                            opacity: pressed ?
                                0.5
                                :
                                1
                        })}
                        onPress={() => setIsRegistered(false)}
                    >
                        <Text style={ styles.registeredText }>Not registered yet? Click here to register.</Text>
                    </Pressable>
               </View>
               :
               <View>
                   <ButtonComp name="Register" />
                    <Pressable
                        style={({ pressed }) => ({
                            opacity: pressed ?
                                0.5
                                :
                                1
                        })}
                        onPress={() => setIsRegistered(true)}
                    >
                        <Text style={ styles.registeredText }>Already registered? Click here to log in.</Text>
                    </Pressable>
               </View>
           }
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary
    },
    registeredText: {
        textAlign: 'center',
        marginTop: 20
    }
})
