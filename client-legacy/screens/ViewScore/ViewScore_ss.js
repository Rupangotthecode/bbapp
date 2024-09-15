import { StyleSheet } from "react-native";

export const VS_ss = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
    },
    scorebarContainer: {
        height: "12%",
        width: "100%",
        zIndex: 16
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 20,
    },
    contentContainer: {
        height: "88%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 15,
        padding: "2%"
    },
    winnerContainer: {
        width: "100%",
        height: "8%",
        borderRadius: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    timelineContainer: {
        width: "100%",
        height: "85%",
    }
})