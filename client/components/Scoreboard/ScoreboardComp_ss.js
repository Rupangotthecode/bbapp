import { StyleSheet } from "react-native";

export const SBCstyleSheet = StyleSheet.create({
    SBmainContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    SBleftContainer: {
        width: "80%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    SBsetScoreContainer: {
        width: "100%",
        height: "70%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    SBmatchScoretext: {
        fontSize: 16,
        fontWeight: "700",
        color: "gray"
    },
    SBmatchScoreContainer: {
        width: "100%",
        height: "30%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    SBlogoContainer: {
        height: "100%",
        width: "20%",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "2%",

    },
    SBsetScoretext: {
        fontSize: 24,
        fontWeight: "700",
        color: "green"
    },
    SBlogo: {
        height: "100%",
        width: "100%",
        borderRadius: 40,
        resizeMode: 'cover'
    },
    ADCmainContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        backgroundColor: "white",
        borderRadius: 10,
        padding: "4%"
    },
    ADCupperContainer: {
        width: "100%",
        height: "15%",
    },
    ADCtitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "green"
    },
    ADClowerContainer: {
        width: "100%",
        height: "85%",
        flexDirection: "row"
    },
    ADCleftContainer: {
        width: "35%",
    },
    ADCrightContainer: {
        width: "65%",
        flexDirection: "column",
    },
    ADCsmallButtonContainer: {
        width: "100%",
        height: "50%",
        justifyContent: "space-evenly",
        padding: "2%",
        flexDirection: "row",
    }
})