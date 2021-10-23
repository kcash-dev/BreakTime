import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native'
import { auth, handleSignup, handleLogin } from '../api/Firebase'
import { ButtonComp } from '../components/Button';
import { colors } from '../utils/Colors';
import { fontSizes, spacing } from '../utils/Sizes';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ isRegistered, setIsRegistered ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth
        .onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true)
                navigation.navigate('ProfileScreen')
            }
        })

        return unsubscribe;
    }, [])

    const login = () => {
        handleLogin(email, password)
    }

    const signup = () => {
        handleSignup(email, password, firstName, lastName)
    }

    return (
        <KeyboardAvoidingView
            style={ styles.container }
            behavior="padding"
        >
           {
               isRegistered ? 
               <View style={ styles.inputContainer }>
                <Text style={ styles.header }>User Login</Text>
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
                <ButtonComp name="Login" callback={ login }/>
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
                   <Text style={ styles.header }>User Registration</Text>
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
                    <View style={ styles.parent }>
                        <TextInput
                            placeholder="First name"
                            value={ firstName }
                            onChangeText={ text => setFirstName(text) }
                            style={ styles.input }
                        />
                        <Pressable
                            style={({ pressed }) => ({
                                opacity: pressed ?
                                    0.5
                                    :
                                    1
                            })}
                            onPress={() => setFirstName('')}
                        >
                            <SimpleLineIcons style={ styles.icon } name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View style={ styles.parent }>
                        <TextInput
                            placeholder="Last Name"
                            value={ lastName }
                            onChangeText={ text => setLastName(text) }
                            style={ styles.input }
                        />
                        <Pressable
                            style={({ pressed }) => ({
                                opacity: pressed ?
                                    0.5
                                    :
                                    1
                            })}
                            onPress={() => setLastName('')}
                        >
                            <SimpleLineIcons style={ styles.icon } name="close" size={24} color="black" />
                        </Pressable>
                    </View>
                    <ButtonComp name="Register" callback={ signup }/>
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
        width: '80%',
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
        width: '90%'
    },
    parent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 8,
        justifyContent: 'space-between',
        marginVertical: spacing.md,
        width: '100%'
    },
    icon: {
        right: 5,
        opacity: 0.5
    },
    header: {
        fontSize: fontSizes.xxl,
        textAlign: 'center',
        bottom: 20
    }
})
