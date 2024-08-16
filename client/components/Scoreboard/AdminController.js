import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SBCstyleSheet } from './ScoreboardComp_ss'
import { useDispatch } from "react-redux"
import { Button } from 'react-native-paper'


const AdminController = (props) => {

    const handleOpenServerModal = () => {
        console.log("handler", props.server)
        props.setServers(props.mainPlayers.filter((val) => !(val.playerName === props.server)))
        props.setShowServerModal(true)
    }

    const handleShowPlayers = () => {
        props.setShowPlayers(true)
    }

    const handleSub = () => {
        props.setShowSub(true)
    }

    const handleTimeout = () => {
        console.log("ih")
        props.setShowTimeOutModal(true)
    }

    return (
        <View style={SBCstyleSheet.ADCmainContainer}>
            <View style={SBCstyleSheet.ADCupperContainer}>
                <Text style={SBCstyleSheet.ADCtitle}>{props.teamName}</Text>
            </View>
            <View style={SBCstyleSheet.ADClowerContainer}>
                <View style={SBCstyleSheet.ADCleftContainer}>
                    <Button mode="elevated" buttonColor="green" textColor="white" height="100%" labelStyle={{ fontSize: 20, fontWeight: 700, padding: 0 }} style={{ justifyContent: "center", alignItems: "center" }} compact={true} onPress={handleOpenServerModal}>
                        +1 pt
                    </Button>
                </View>
                <View style={SBCstyleSheet.ADCrightContainer}>
                    <View style={SBCstyleSheet.ADCsmallButtonContainer}>
                        <Button icon={"human-queue"} mode="elevated" buttonColor="green" textColor="white" height="100%" labelStyle={{ fontSize: 45, padding: 0 }} style={{ justifyContent: "center", alignItems: "space-around", width: 80 }} compact onPress={handleShowPlayers}>

                        </Button>
                        <Button icon={"human-capacity-increase"} mode="elevated" buttonColor="green" textColor="white" height="100%" labelStyle={{ fontSize: 45, padding: 0 }} style={{ justifyContent: "center", alignItems: "space-around", width: 80 }} compact onPress={handleSub}>

                        </Button>

                    </View>
                    <View style={SBCstyleSheet.ADCsmallButtonContainer}>
                        <Button icon={"clock-time-two-outline"} mode="elevated" buttonColor="green" textColor="white" height="100%" labelStyle={{ fontSize: 45, padding: 0 }} style={{ justifyContent: "center", alignItems: "space-around", width: 80 }} compact onPress={handleTimeout}>

                        </Button>
                        <Button icon={"exclamation-thick"} mode="elevated" buttonColor="green" textColor="white" height="100%" labelStyle={{ fontSize: 45, padding: 0 }} style={{ justifyContent: "center", alignItems: "space-around", width: 80 }} compact disabled>

                        </Button>

                    </View>
                </View>
            </View></View>
    )
}

export default AdminController