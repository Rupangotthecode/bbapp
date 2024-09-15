import { StyleSheet } from "react-native";

export const ACStyleSheet = StyleSheet.create({
    ACmainContainer: {
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    ACupperContainer: {
        height: "12%",
        width: "100%",
    },
    AClowerContainer: {
        height: "88%",
        width: "100%",
    },
    ACmodalContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 20,
        borderRadius: 15,
    },
    ACmodalBodyText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#6e6d6d",
        textAlign: "left"
    }
})