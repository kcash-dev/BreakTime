import React, { useState } from 'react';
import { View } from 'react-native'

import { UserDataScreen } from './UserDataScreen';
import { auth, currentUserUID } from '../api/Firebase';
import { LoginScreen } from './LoginScreen';

export const ProfileScreen = () => {
    const [ isUser, setIsUser ] = useState(false)
    auth.onAuthStateChanged(function(user) {
        if (user) {
            setIsUser(true)
        } else {
            setIsUser(false)
        }
    })

    return (
        <View style={{ flex: 1 }}>
            { isUser ?
                <UserDataScreen />
                :
                <LoginScreen />
            }
        </View>
    )
}