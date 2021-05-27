import { View } from 'react-native';
import React, { useEffect } from "react";
import { Screen } from '../../../constants';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from "@react-native-community/async-storage";

const SplashScr = ({ navigation }) => {

    useEffect(() => {
        checkRouter()
    }, []);

    const checkRouter = () => {
        AsyncStorage.getItem('DATA').then(val => {
            let data = JSON.parse(val) || []
            setTimeout(() => {
                data?.length > 0
                    ? navigation.replace(Screen.WHEEL_SCREEN, { data, type: 'OPEN_APP' })
                    : navigation.replace(Screen.HOME_SCREEN)
                SplashScreen.hide()
            }, 1000);
        })
    };

    return (<View />)
}

export default SplashScr;
