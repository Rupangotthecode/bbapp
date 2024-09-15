import { StyleSheet } from "react-native";


export const HomeComponentStyles = StyleSheet.create({
    homeMenuContainer: {
        height: "100%",
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    HMImainContainer: {
        height: "20%",
        width: "100%",
        flexDirection: 'row',
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 30,
        padding: "3%"
    },
    HMItextContainer: {
        height: "100%",
        width: "70%",
        padding: "1.5%",
        paddingRight: "10%",
        flexDirection: 'column',
        justifyContent: "flex-start",
    },
    HMIbuttonContainer: {
        height: "100%",
        width: "30%",
    }
})