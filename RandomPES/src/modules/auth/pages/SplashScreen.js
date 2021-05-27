import { View } from 'react-native';
import React, { useEffect } from "react";
import { Screen, DATA } from '../../../constants';
import SplashScreen from 'react-native-splash-screen';

const SplashScr = ({ navigation }) => {

    useEffect(() => {
        checkLoggedUser();
    }, []);

    const checkLoggedUser = () => {
      navigation.replace(Screen.HOME_SCREEN)
        // getCurrentUser().then(user => {
        //     if (user) {
        //         setTimeout(async () => {
        //             let tempUser = JSON.parse(user)
        //             await dispath(actionSetUser({ tempUser }))
        //             if (tempUser?.role === 'ARTIST' || tempUser?.role === 'FAN') {
        //                 navigation.replace(Screen.HOME_STACK)
        //             } else {
        //                 navigation.replace(Screen.FAN_AND_FLOW)
        //             }
        //             SplashScreen.hide()
        //         }, 1000);
        //     } else {
        //         setTimeout(() => {
        //             navigation.replace(Screen.AUTH_STACK)
        //         }, 1000)
        //     }
        // })
    };

    return (<View />)
}

export default SplashScr;
