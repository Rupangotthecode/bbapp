import { StyleSheet } from "react-native";

export const ScheduleCompStyleSheet = StyleSheet.create({
    scheduleMainContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "space-evenly"
    },
    scheduleUpperContainer: {
        height: "10%",
        paddingBottom: "2%",
        width: "100%",
    },
    scheduleLowerContainer: {
        height: "90%",
        paddingBottom: "2%",
        width: "100%",
        justifyContent: "space-evenly"
    },
    scheduleDateContainer: {
        height: "20%",
        justifyContent: "space-evenly",
    },
    scheduleDateUpperContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    scheduleDateText: {
        fontSize: 18,
        color: "darkblue",
        fontWeight: "600",
    },
    scheduleHeaderText: {
        fontSize: 33,
        fontWeight: "700",
        color: "darkblue",
        textAlign: "left",
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