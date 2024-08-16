import { StyleSheet } from "react-native";


export const HomeStyles = StyleSheet.create({
    homeMainContainer: {
        height: "100%",
        width: "100%",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    homeGreetingContainer: {
        height: "10%",
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        padding: "1%",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: "space-between",

        alignItems: "center",
        flexDirection: "row"
    },
    homeGreetingLeftContainer: {
        height: "100%",
        width: "25%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    homeGreetingText: {
        fontSize: 20,
        fontWeight: "600",
        color: "green",
    },
    homeGreetingIcon: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    homeGreetingRightContainer: {
        height: "100%",
        width: "75%",
        flexDirection: "row",
        paddingRight: "3%",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    homeGreetingLogoutContainer: {
        height: "100%",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    homeContentContainer: {
        height: "90%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: "2%",
    },
    homeAdminControlsContainer: {
        height: "10%",
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2%"
    },
    homeAdminTextContainer: {
        height: "100%",
        width: "30%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    homeAdminButtonsContainer: {
        height: "100%",
        width: "70%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    homeAdminControlsText: {
        fontSize: 20,
        fontWeight: "600",
        color: "green"
    },
    homeBGImage: {
        flex: 1,
        justifyContent: "center"
    },
    homeMenuContainer: {
        flex: 1,
        width: "100%",
    }
})