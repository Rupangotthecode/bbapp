import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authCompStyleSheet } from './AuthComponent_ss'
import { login } from '../../actions/auth'

const Login = (props) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if (username && password) {
            dispatch(login({ username, password }, props.navigate))
        }
    }

    return (
        <View style={authCompStyleSheet.loginMainContainer}>
            <View style={authCompStyleSheet.signupUpperContainer}>
                <Text style={authCompStyleSheet.signupHeaderText}>Admin Login</Text>
            </View>
            <View style={authCompStyleSheet.signupLowerContainer}>
                <TextInput
                    label="Username"
                    outlineColor='green'
                    activeOutlineColor='green'
                    mode='outlined'
                    value={username}
                    placeholder='Enter your username.'
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    label="Password"
                    outlineColor='green'
                    activeOutlineColor='green'
                    mode='outlined'
                    value={password}
                    placeholder='Enter your password.'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <Button buttonColor="green" mode="contained" onPress={() => handleLogin()}>
                    Login
                </Button>
                <View style={authCompStyleSheet.signupSwitcherContainer}>
                    <Text>Create admin account?</Text>
                    <Button mode="text" textColor='green' onPress={() => props.setIsSignup(true)} compact={true}>
                        Sign Up
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Login