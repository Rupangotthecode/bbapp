import { StyleSheet } from "react-native";

const SBLSS = StyleSheet.create({
    SBLmainContainer: {
        height: "100%",
        padding: "3%",
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
    }
})

export default SBLSS