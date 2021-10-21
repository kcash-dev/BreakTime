import React, { useState } from 'react';
import { View } from 'react-native'

import UserDataScreen from './UserDataScreen';

export const ProfileScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <UserDataScreen />
        </View>
    )
}