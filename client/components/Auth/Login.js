import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authCompStyleSheet } from './AuthComponent_ss'
import { login } from '../../actions/auth'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Login = (props) => {

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (username && password) {
            setLoading(true);  // Show the activity indicator
            try {
                await dispatch(login({ username, password }, props.navigate));
            } catch (error) {
                alert("Login failed. Please check your credentials and try again.");
            } finally {
                setLoading(false);  // Hide the activity indicator
            }
        } else {
            alert("Please enter both username and password.");
        }
    };

    return (
        <View style={authCompStyleSheet.loginMainContainer}>
            <View style={authCompStyleSheet.signupUpperContainer}>
                <Text style={authCompStyleSheet.signupHeaderText}>Admin Login</Text>
            </View>
            <View style={authCompStyleSheet.signupLowerContainer}>
                <TextInput
                    label="Username"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={username}
                    placeholder='Enter your username.'
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    label="Password"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={password}
                    placeholder='Enter your password.'
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <Button buttonColor="darkblue" mode="contained" onPress={() => handleLogin()}>
                    {loading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Login"}
                </Button>
                <View style={authCompStyleSheet.signupSwitcherContainer}>
                    <Text>Create admin account?</Text>
                    <Button mode="text" textColor='darkblue' onPress={() => props.setIsSignup(true)} compact={true}>
                        Sign Up
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Login