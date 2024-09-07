import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { endMatch } from '../../actions/scoreboard'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'

const EndMatchModal = (props) => {
    const dispatch = useDispatch()

    const gameDetails = props.gameDetails

    let matchWinner = ""
    let matchLoser = ""
    let matchDraw = false

    if (gameDetails.team1MatchPoints > gameDetails.team2MatchPoints) {
        matchWinner = gameDetails.team1Name
        matchLoser = gameDetails.team2Name
    }
    else if (gameDetails.team1MatchPoints < gameDetails.team2MatchPoints) {
        matchWinner = gameDetails.team2Name
        matchLoser = gameDetails.team1Name
    }
    else {
        matchWinner = "Tie"
        matchLoser = "Tie"
        matchDraw = true
    }

    const handleEndMatch = () => {
        dispatch(endMatch(gameDetails._id, matchWinner, matchLoser, matchDraw))
        props.setShowEndMatchModal(false)
        props.navigate("Home")
    }

    return (
        <Modal visible={props.showEndMatchModal} onDismiss={() => props.setShowEndMatchModal(false)} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>End Match?</Text>
            <Text style={{ fontSize: 18, fontWeight: "400", color: "darkblue", textAlign: "center", marginBottom: 10 }}>The match winner will be {matchWinner}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleEndMatch} >
                    Yes
                </Button>
                <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowEndMatchModal(false)} >
                    Cancel
                </Button>
            </View>

        </Modal>
    )
}

export default EndMatchModal