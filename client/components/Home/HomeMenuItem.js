import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import { HomeComponentStyles } from "./HomeComponent_ss";

const HomeMenuItem = (props) => {
    return (
        <View style={HomeComponentStyles.HMImainContainer}>
            <View style={HomeComponentStyles.HMItextContainer}>
                <Text style={{ fontSize: 35, fontWeight: 700, color: "green" }}>{props.heading}</Text>
                <Text style={{ fontSize: 14, fontWeight: 500, color: "green" }}>{props.desc}</Text>
            </View>
            <View style={HomeComponentStyles.HMIbuttonContainer}>
                <Button icon={props.buttonIcon} mode="elevated" buttonColor="green" textColor="white" onPress={() => props.navigate(props.navigateTo)} height="100%" labelStyle={{ fontSize: 50, fontWeight: 700, padding: 0 }} style={{ justifyContent: "center", alignItems: "center" }} compact={true}>
                    {props.title}
                </Button>
            </View>
        </View >
    );
}

export default HomeMenuItem