import React, { useState } from 'react';
import { View } from 'react-native'
import { LoginScreen } from './LoginScreen';

import UserDataScreen from './UserDataScreen';

export const ProfileScreen = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    console.log(isLoggedIn)

    return (
        <View style={{ flex: 1 }}>
            { isLoggedIn ?
                <UserDataScreen 
                    setLogged={ setIsLoggedIn }
                />
                :
                <LoginScreen 
                    setLogged={ setIsLoggedIn }
                    loggedIn={ isLoggedIn }
                />
            }
        </View>
    )
}