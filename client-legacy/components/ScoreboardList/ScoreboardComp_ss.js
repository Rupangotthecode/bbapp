import { StyleSheet } from "react-native";

const SBLCompSS = StyleSheet.create({
    SBLImainContainer: {
        height: 100,
        width: "100%",
        flexDirection: "row",
        padding: "2%",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 20,
        borderBottomColor: "black",
        borderBottomWidth: 0.4
    },
    SBLIleftContainer: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    SBLIrightContainer: {
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    }
})

export default SBLCompSS