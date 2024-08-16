import { StyleSheet } from "react-native";

export const authCompStyleSheet = StyleSheet.create({
    signupMainContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-start"
    },
    signupUpperContainer: {
        height: "auto",
        paddingBottom: "2%",
        width: "100%",
    },
    signupHeaderText: {
        fontSize: 33,
        fontWeight: "700",
        color: "green",
        textAlign: "center",

    },
    signupLowerContainer: {
        height: "87%",
        width: "100%",
        justifyContent: "space-evenly",
        overflow: "scroll"
    },
    signupSwitcherContainer: {
        height: "auto",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    loginMainContainer: {
        height: "60%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})