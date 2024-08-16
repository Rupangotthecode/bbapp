import { StyleSheet } from "react-native";

export const NGCompStyleSheet = StyleSheet.create({
    PDmainContainer: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 10,
        paddingBottom: 10
    },
    PDDateContainer: {
        justifyContent: "space-evenly",
    },
    PDDateUpperContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    PDDateText: {
        fontSize: 18,
        color: "green",
        fontWeight: "500",
    },
    NGFMainContainer: {
        padding: "3%",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    NGFUpperContainer: {
        height: 45
    },
    NGFHeaderText: {
        fontSize: 30,
        textAlign: "center",
        color: "green",
        fontWeight: "600"
    },
    NGFLowerContainer: {
        justifyContent: "flex-start",
        gap: 10,
    },
    NGFImageContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 10
    },
    NGFImageUpperContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 10
    },
    NGFImageLowerContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        gap: 10,
        borderWidth: 2,
        borderStyle: "dotted",
        borderRadius: 20,
        borderColor: "green"
    }
})