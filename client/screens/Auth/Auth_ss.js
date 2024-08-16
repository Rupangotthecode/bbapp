import { StyleSheet } from "react-native";

export const authStyleSheet = StyleSheet.create({
    authMainContainer: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
    },
    authImageContainer: {
        width: "40%",
        height: "20%",
    },
    authImageIcon: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    authFormContainer: {
        backgroundColor: "rgb(255,255,255)",
        borderRadius: 20,
        height: "70%",
        width: "90%",
        padding: "7%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        justifyContent: "center",

    },
})