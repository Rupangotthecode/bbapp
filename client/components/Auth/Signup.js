import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { authCompStyleSheet } from './AuthComponent_ss'
import { useDispatch } from "react-redux"
import { signup } from '../../actions/auth'

const Signup = (props) => {

    const navigate = props.navigate

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [adminCode, setAdminCode] = useState('')

    const handleSignup = () => {
        if (username && name && password && repassword && adminCode) {
            if (password === repassword) {
                dispatch(signup({ username, name, password, adminCode }, navigate))
            }

        }
    }

    return (
        <View style={authCompStyleSheet.signupMainContainer}>
            <View style={authCompStyleSheet.signupUpperContainer}>
                <Text style={authCompStyleSheet.signupHeaderText}>Admin Signup</Text>
            </View>
            <View style={authCompStyleSheet.signupLowerContainer}>
                <TextInput
                    label="Enter Username"
                    outlineColor='green'
                    activeOutlineColor='green'
                    mode='outlined'
                    value={username}
                    placeholder='Type account username.'
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    label="Enter Name"
                    outlineColor='green'
                    activeOutlineColor='green'
                    mode='outlined'
                    value={name}
                    placeholder='Type your name.'
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Enter Password"
                    outlineColor='green'
                    activeOutlineColor='green'
                    mode='outlined'
                    value={password}
                    placeholder='Type a suitable password.'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <TextInput
                    label="Re-enter Password"
                    mode='outlined'
                    outlineColor='green'
                    activeOutlineColor='green'
                    value={repassword}
                    placeholder='Retype the same password.'
                    onChangeText={text => setRepassword(text)}
                    secureTextEntry
                />
                <TextInput
                    label="Enter Admin Code"
                    outlineColor='green'
                    activeOutlineColor='green'
                    mode='outlined'
                    value={adminCode}
                    placeholder='Type the admin code.'
                    onChangeText={text => setAdminCode(text)}
                    secureTextEntry
                />
                <Button buttonColor="green" mode="contained" onPress={() => handleSignup()}>
                    Sign Up
                </Button>
                <View style={authCompStyleSheet.signupSwitcherContainer}>
                    <Text>Already an Admin?</Text>
                    <Button mode="text" textColor='green' onPress={() => props.setIsSignup(false)} compact={true}>
                        Log In
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Signup