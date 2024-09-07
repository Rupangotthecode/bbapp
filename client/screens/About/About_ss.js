import { StyleSheet } from "react-native";

export const About_ss = StyleSheet.create({
    mainContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        gap: 10
    },
    headerContainer: {
        height: "10%",
        width: "100%",
        borderBottomEndRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    contentContainer: {
        flex: 1,
        padding: "3%",
    },
    aboutAppContainer: {
        borderRadius: 15,
        backgroundColor: "white",
        padding: "3%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    }
})