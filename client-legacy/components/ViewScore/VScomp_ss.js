import { StyleSheet } from "react-native";

export const VScomp_ss = StyleSheet.create({
    timelineMainContainer: {
        height: "100%",
        width: "100%",
        padding: "4%",
        backgroundColor: "white",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 10,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    timelineUpperContainer: {
        width: "100%",
    },
    timelineLowerContainer: {
        flex: 1,
        width: "100%",
    }
})