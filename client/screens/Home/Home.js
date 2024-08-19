import { View, Text, StatusBar, ImageBackground, Image } from "react-native";
import { Button } from 'react-native-paper';
import Home_bg from "../../assets/Home/bb_game_bg.jpg"
import bb_logo from "../../assets/Home/bb_app_icon.png"
import { useState } from "react";
import { HomeStyles } from "./Home_ss";
import { useSelector, useDispatch } from "react-redux"
import HomeMenu from "../../components/Home/HomeMenu";
import { logout } from "../../actions/auth";

const Home = ({ navigation }) => {

    const dispatch = useDispatch()

    const User = useSelector((state) => state.currentUserReducer)?.result;
    console.log("user", User)

    const handleLogout = () => {
        dispatch(logout(navigation.navigate))
    }

    return (
        <View style={HomeStyles.homeMainContainer}>
            <ImageBackground source={Home_bg} resizeMode="cover" style={HomeStyles.homeBGImage}>
                <View style={HomeStyles.homeGreetingContainer}>
                    <View style={HomeStyles.homeGreetingLeftContainer}>
                        <Image source={bb_logo} style={HomeStyles.homeGreetingIcon} />
                    </View>
                    <View style={HomeStyles.homeGreetingRightContainer}>
                        {User ? (<View style={HomeStyles.homeGreetingLogoutContainer}>
                            <Text style={HomeStyles.homeGreetingText}>Hi, {User.name}</Text>
                            <Button buttonColor="darkblue" mode="contained" onPress={() => handleLogout()}>
                                Logout
                            </Button>
                        </View>) : (<Button buttonColor="darkblue" mode="contained" onPress={() => navigation.navigate("Auth")}>
                            Admin Sign In
                        </Button>)}
                    </View>
                </View>
                <View style={HomeStyles.homeContentContainer}>

                    {User && <View style={HomeStyles.homeAdminControlsContainer}>
                        <View style={HomeStyles.homeAdminTextContainer}>
                            <Text style={HomeStyles.homeAdminControlsText}>Admin Controls</Text>
                        </View>
                        <View style={HomeStyles.homeAdminButtonsContainer}>
                            <Button icon="plus" buttonColor="darkblue" compact={true} mode="contained" onPress={() => navigation.navigate("NewGame")}>
                                New Game
                            </Button>
                            <Button icon="calendar-blank" compact={true} buttonColor="darkblue" mode="contained" onPress={() => navigation.navigate("AddSchedule")} >
                                Schedule
                            </Button>
                        </View>
                    </View>}
                    <View style={HomeStyles.homeMenuContainer}>
                        <HomeMenu navigate={navigation.navigate} />
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}
export default Home;