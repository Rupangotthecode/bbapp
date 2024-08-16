import { StyleSheet } from "react-native";

export const ScheduleStyleSheet = StyleSheet.create({
    ScheduleMainContainer: {
        height: "100%",
        width: "100%",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "lightgray",
        padding: "3%"
    },
    ScheduleFormContainer: {
        borderRadius: 15,
        height: "80%",
        width: "100%",
        padding: "5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        justifyContent: "center",
        backgroundColor: "white",

    },
})