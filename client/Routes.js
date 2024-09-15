import { View, Text, SafeAreaView, StatusBar, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import Home from './screens/Home/Home';
import Auth from './screens/Auth/Auth';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './actions/currentUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from './screens/Calendar/Calendar';
import Schedule from './screens/Schedule/Schedule';
import NewGame from './screens/NewGame/NewGame';
import AdminControl from './screens/AdminControl/AdminControl';
import ScoreboardList from './screens/ScoreboardList/ScoreboardList';
import ViewScore from './screens/ViewScore/ViewScore';
import LiveLinks from './screens/LiveLinks/LiveLinks';
import About from './screens/About/About';

const Routes = () => {

    const { height, width } = useWindowDimensions();
    const Stack = createStackNavigator();

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await AsyncStorage.getItem("Profile");
            if (profile) {
                dispatch(setCurrentUser(JSON.parse(profile)));
            }
        };

        fetchProfile();
    }, [dispatch]);



    return (
        <NavigationContainer>
            <SafeAreaView
                style={{ height: height, width: width, fontFamily: "Roboto" }}
            >
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="white"
                />
                <Stack.Navigator screenOptions={() => ({
                    headerShown: false
                })}
                    initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Auth" component={Auth} />
                    <Stack.Screen name="Calendar" component={Calendar} />
                    <Stack.Screen name="AddSchedule" component={Schedule} />
                    <Stack.Screen name="NewGame" component={NewGame} />
                    <Stack.Screen name="AdminControl" component={AdminControl} />
                    <Stack.Screen name="ScoreboardList" component={ScoreboardList} />
                    <Stack.Screen name="ViewScore" component={ViewScore} />
                    <Stack.Screen name="LiveLinks" component={LiveLinks} />
                    <Stack.Screen name="About" component={About} />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    )
}

export default Routes