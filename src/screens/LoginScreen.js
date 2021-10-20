import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native'
import { auth } from '../auth/firebase';
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';
import { fontSizes, spacing } from '../utils/Sizes';
import { SimpleLineIcons } from '@expo/vector-icons';

export const LoginScreen = ({ setLogged }) => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isRegistered, setIsRegistered ] = useState(true)

    useEffect(() => {
        const unsubscribe = auth
        .onAuthStateChanged(user => {
            if (user) {
                setLogged(true)
            }
        })

        return unsubscribe;
    }, [])

    const validate = (text) => {
        console.log(text);
        setEmail(text)
        let reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email.test(reg) === false) {
          Alert.alert('Must enter a valid email')
        }
        else {
          setEmail(text)
          console.log("Email is Correct");
        }
      }

    const handleSignup = () => {
        if (!password) {
            Alert.alert('Must enter a valid password')
        }

        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Registered with: ' + user.email)
        })
        .catch(err => console.log(err.message))
    }

    const handleLogin = () => {
        if(!email) {
            Alert.alert('Must enter a valid email')
        } else if (!password) {
            Alert.alert('Must enter a valid password')
        }

        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Logged in with: ' + user.email)
        })
        .catch(err => console.log(err.message))
    }

    return (
        <KeyboardAvoidingView
            style={ styles.container }
            behavior="padding"
        >
           {
               isRegistered ? 
               <View style={ styles.inputContainer }>
                <View style={ styles.parent }>
                    <TextInput
                        placeholder="Email"
                        value={ email }
                        onChangeText={ text => setEmail(text) }
                        style={ styles.input }
                        autoCapitalize="none"
                        ref={input => { textInput = input }} 
                    />
                    <Pressable
                        style={({ pressed }) => ({
                            opacity: pressed ?
                                0.5
                                :
                                1
                        })}
                        onPress={() => setEmail('')}
                    >
                        <SimpleLineIcons style={ styles.icon } name="close" size={24} color="black" />
                    </Pressable>
                </View>
                <View style={ styles.parent }>
                    <TextInput
                        placeholder="Password"
                        value={ password }
                        onChangeText={ text => setPassword(text) }
                        style={ styles.input }
                        secureTextEntry
                    />
                    <Pressable
                        style={({ pressed }) => ({
                            opacity: pressed ?
                                0.5
                                :
                                1
                        })}
                        onPress={() => setPassword('')}
                    >
                        <SimpleLineIcons style={ styles.icon } name="close" size={24} color="black" />
                    </Pressable>
                </View>
                <ButtonComp name="Login" callback={ handleLogin }/>
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
               <View style={ styles.inputContainer }>
                    <View style={ styles.parent }>
                        <TextInput
                            placeholder="Email"
                            value={ email }
                            onChangeText={ text => setEmail(text) }
                            style={ styles.input }
                            autoCapitalize="none"
                            ref={input => { textInput = input }} 
                        />
                        <SimpleLineIcons style={ styles.icon } name="close" size={24} color="black" />
                    </View>
                    <View style={ styles.parent }>
                        <TextInput
                            placeholder="Password"
                            value={ password }
                            onChangeText={ text => setPassword(text) }
                            style={ styles.input }
                            secureTextEntry
                        />
                        <SimpleLineIcons style={ styles.icon } name="close" size={24} color="black" />
                    </View>
                    <ButtonComp name="Register" callback={ handleSignup }/>
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
    },
    inputContainer: {
        width: '60%',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    input: {
        padding: spacing.md,
        fontSize: fontSizes.md,
        width: '80%'
    },
    parent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        justifyContent: 'space-between',
        marginVertical: spacing.md

    },
    icon: {
        right: 5,
        opacity: 0.5
    }
})