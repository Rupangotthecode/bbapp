import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { authCompStyleSheet } from './AuthComponent_ss'
import { useDispatch } from "react-redux"
import { signup } from '../../actions/auth'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Signup = (props) => {

    const navigate = props.navigate

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [adminCode, setAdminCode] = useState('')

    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (username && name && password && repassword && adminCode) {
            if (password === repassword) {
                setLoading(true);  // Show the activity indicator
                try {
                    await dispatch(signup({ username, name, password, adminCode }, navigate));
                } catch (error) {
                    alert("Signup failed. Please try again.");
                } finally {
                    setLoading(false);  // Hide the activity indicator
                }
            } else {
                alert("Passwords do not match.");
            }
        } else {
            alert("Please fill in all required fields.");
        }
    };

    return (
        <View style={authCompStyleSheet.signupMainContainer}>
            <View style={authCompStyleSheet.signupUpperContainer}>
                <Text style={authCompStyleSheet.signupHeaderText}>Admin Signup</Text>
            </View>
            <View style={authCompStyleSheet.signupLowerContainer}>
                <TextInput
                    label="Enter Username"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={username}
                    placeholder='Type account username.'
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    label="Enter Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={name}
                    placeholder='Type your name.'
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Enter Password"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={password}
                    placeholder='Type a suitable password.'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <TextInput
                    label="Re-enter Password"
                    mode='outlined'
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    value={repassword}
                    placeholder='Retype the same password.'
                    onChangeText={text => setRepassword(text)}
                    secureTextEntry
                />
                <TextInput
                    label="Enter Admin Code"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={adminCode}
                    placeholder='Type the admin code.'
                    onChangeText={text => setAdminCode(text)}
                    secureTextEntry
                />
                <Button buttonColor="darkblue" mode="contained" onPress={() => handleSignup()}>
                    {loading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Login"}
                </Button>
                <View style={authCompStyleSheet.signupSwitcherContainer}>
                    <Text>Already an Admin?</Text>
                    <Button mode="text" textColor='darkblue' onPress={() => props.setIsSignup(false)} compact={true}>
                        Log In
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Signup