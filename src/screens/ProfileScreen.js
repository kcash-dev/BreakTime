import React, { useEffect } from 'react';
import { View } from 'react-native'

import { UserDataScreen } from './UserDataScreen';
import { db, currentUserUID } from '../api/Firebase';
import { LoginScreen } from './LoginScreen';

export const ProfileScreen = () => {

    return (
        <View style={{ flex: 1 }}>
            { currentUserUID ?
                <UserDataScreen />
                :
                <LoginScreen />
            }
        </View>
    )
}