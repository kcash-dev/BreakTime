import React, { useState } from 'react';
import { View } from 'react-native'
import LoginScreen from './LoginScreen';

import UserDataScreen from './UserDataScreen';

export const ProfileScreen = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    return (
        <View style={{ flex: 1 }}>
            { isLoggedIn ?
                <UserDataScreen />
                :
                <LoginScreen />
            }
        </View>
    )
}