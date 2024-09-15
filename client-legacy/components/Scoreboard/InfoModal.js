import { View, Text } from 'react-native'
import React from 'react'
import { Modal } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'

const InfoModal = (props) => {
    const gameDetails = props.gameDetails
    return (
        <Modal visible={props.showInfo} onDismiss={props.hideInfoModal} contentContainerStyle={ACStyleSheet.ACmodalContainer}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Match Details</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Tournament: {gameDetails?.tournament}</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Venue: {gameDetails?.venue}</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Organizer: {gameDetails?.organizer}</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Set: {gameDetails?.setNumber}</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Pool Number: {gameDetails?.poolNo}</Text>
            <Text style={ACStyleSheet.ACmodalBodyText}>Match Number: {gameDetails?.matchNo}</Text>
        </Modal>
    )
}

export default InfoModal