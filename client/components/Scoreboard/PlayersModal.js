import { View, Text } from 'react-native'
import React from 'react'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss';
import { Modal } from 'react-native-paper';

const PlayersModal = (props) => {


    const substitutePlayers = props.teamPlayers?.filter(teamPlayer =>
        !props.mainPlayers?.some(mainPlayer => mainPlayer.playerNo === teamPlayer.playerNo)
    );

    return (
        <Modal visible={props.showPlayers} onDismiss={() => props.setShowPlayers(false)} contentContainerStyle={ACStyleSheet.ACmodalContainer}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Team Details</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Team Name: {props.teamName}</Text>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Main Team: </Text>
            {props.mainPlayers?.map((player, index) => (<Text style={ACStyleSheet.ACmodalBodyText} key={index}>{player.playerName} - {player.playerNo}</Text>))}
            <Text style={{ fontSize: 18, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Substitutes: </Text>
            {substitutePlayers?.map((player, index) => (<Text style={ACStyleSheet.ACmodalBodyText} key={index}>{player.playerName} - {player.playerNo}</Text>))}
            <Text style={{ fontSize: 16, fontWeight: "400", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Team Coach: {props.teamCoach}</Text>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Team Assistant Coach: {props.teamAsstCoach}</Text>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Team Manager: {props.teamManager}</Text>
        </Modal>
    )
}

export default PlayersModal