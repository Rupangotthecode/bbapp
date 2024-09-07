import { View } from "react-native";
import { HomeComponentStyles } from "./HomeComponent_ss.js";
import HomeMenuItem from "./HomeMenuItem.js";


const HomeMenu = (props) => {
    return (
        <View style={HomeComponentStyles.homeMenuContainer}>
            <HomeMenuItem heading="Calendar" desc="View upcoming and past match schedules on a calendar." buttonIcon="calendar-blank" navigate={props.navigate} navigateTo="Calendar" />
            <HomeMenuItem heading="Scoreboards" desc="View upcoming, past and live match scoreboards." buttonIcon="scoreboard-outline" navigate={props.navigate} navigateTo="ScoreboardList" />
            <HomeMenuItem heading="Live Links" desc="Live links of matches posted by admins." buttonIcon="television-classic" navigate={props.navigate} navigateTo="LiveLinks" />
            <HomeMenuItem heading="About" desc="Facts and rules of ball badminton." buttonIcon="tennis" navigate={props.navigate} navigateTo="About" />
        </View>

    );
}

export default HomeMenu