import { View, Text } from 'react-native'
import { useDispatch } from "react-redux"
import React, { useState } from 'react'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { changeServer } from '../../actions/scoreboard'
import { Button, Modal, RadioButton } from 'react-native-paper'

const ServerModal = (props) => {

    const dispatch = useDispatch()

    const [selectedServer, setSelectedServer] = useState("")

    const handleChangeServer = () => {
        console.log(selectedServer)
        if (selectedServer !== "") {
            console.log("server:", selectedServer)
            dispatch(changeServer(props.gameId, props.teamName, selectedServer))
            props.setShowServerModal(false)
            setSelectedServer("")
        }
        else {
            alert("Please select a server")
        }
    }

    return (
        <Modal visible={props.showServerModal} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Select Next Server.</Text>
            {props.servers?.map((player, index) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
                    <RadioButton
                        value={player.playerName}
                        status={selectedServer === player.playerName ? "checked" : "unchecked"}
                        color='darkblue'
                        onPress={() => setSelectedServer(player.playerName)}
                    /><Text style={{ fontSize: 14, fontWeight: "400", color: "darkblue", textAlign: "left" }}>{player.playerName}</Text>

                </View>

            ))}
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", }}>
                <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleChangeServer} >
                    {props.initialSelection ? "Start Set" : "Change Server"}
                </Button>
                {!props.initialSelection && <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowServerModal(false)} >
                    Cancel
                </Button>}
            </View>

        </Modal>)
}

export default ServerModal