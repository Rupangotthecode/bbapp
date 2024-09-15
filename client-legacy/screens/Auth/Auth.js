import { View, Text, Image } from 'react-native'
import bb_logo from "../../assets/Home/bb_app_icon.png"
import React, { useState } from 'react'
import { authStyleSheet } from './Auth_ss'
import Signup from '../../components/Auth/Signup'
import { Button } from 'react-native-paper'
import Login from '../../components/Auth/Login'

const Auth = ({ navigation }) => {

    const [isSignup, setIsSignup] = useState(false)

    return (
        <View style={authStyleSheet.authMainContainer}>
            <View style={authStyleSheet.authImageContainer}>
                <Image source={bb_logo} style={authStyleSheet.authImageIcon} />
            </View>
            <View style={authStyleSheet.authFormContainer}>
                {isSignup ? (
                    <Signup setIsSignup={setIsSignup} navigate={navigation.navigate} />
                ) : (
                    <Login setIsSignup={setIsSignup} navigate={navigation.navigate} />
                )}
            </View>
        </View>
    )
}

export default Auth