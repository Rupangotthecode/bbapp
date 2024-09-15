import { StyleSheet } from "react-native";

const SBLSS = StyleSheet.create({
    SBLscrollContainer: {
        padding: "3%",
        paddingTop: 0,
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 10
    },
    SBLheaderContainer: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        height: "10%",
        padding: "3%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    SBLheader: {
        fontSize: 22,
        color: "darkblue",
        fontWeight: "500",
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

export default SBLSS