import { StyleSheet } from "react-native";

export const LL_ss = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
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
    linksContainer: {
        flex: 1,
        width: "100%",
        padding: "3%",
    },
    linksScrollContainer: {
        width: "100%",
        padding: "3%",
        justifyContent: "flex-start",
        gap: 10
    }
})