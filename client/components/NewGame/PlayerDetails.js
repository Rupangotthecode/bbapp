import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { NGCompStyleSheet } from './NewGameComp_ss'
import DateTimePicker from '@react-native-community/datetimepicker';

const PlayerDetails = (props) => {

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [playerName, setPlayerName] = useState("")
    const [playerNo, setPlayerNo] = useState("")
    const [dob, setDob] = useState(new Date())
    const [openDate, setOpenDate] = useState(false)

    const onChange = (e, value) => {
        setDob(value)
        setOpenDate(false)
    }

    const saveChanges = () => {
        const player = props.playersList.find((player) => player.id === props.id)
        if (playerName != "" && playerNo != "" && dob != "") {
            if (player) {
                props.setPlayersList(prevPlayers =>
                    prevPlayers.map(player =>
                        player.id === props.id ? { ...player, playerName: playerName, playerNo: playerNo, dob: formatDate(dob) } : player
                    ))
            }
            else {
                props.setPlayersList(prevPlayers => [...prevPlayers, { id: props.id, playerName: playerName, playerNo: playerNo, dob: formatDate(dob) }])
            }
            console.log(props.playersList)
            Alert.alert("saved!")
        }
    }

    return (
        <View style={NGCompStyleSheet.PDmainContainer}>
            <TextInput
                label="Player Name"
                outlineColor='darkblue'
                activeOutlineColor='darkblue'
                mode='outlined'
                value={playerName}
                placeholder='Enter Player Name'
                onChangeText={text => setPlayerName(text)}
            />
            <TextInput
                label="Player Number"
                outlineColor='darkblue'
                activeOutlineColor='darkblue'
                mode='outlined'
                value={playerNo}
                placeholder='Enter Player Number'
                onChangeText={text => setPlayerNo(text)}
            />
            <View style={NGCompStyleSheet.PDDateContainer}>
                <View style={NGCompStyleSheet.PDDateUpperContainer}>
                    <Text style={NGCompStyleSheet.PDDateText}>Enter Date Of Birth: </Text>
                    <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={() => setOpenDate(true)}>
                        Enter DoB
                    </Button>
                    {openDate && <DateTimePicker
                        value={dob}
                        is24Hour={true}
                        onChange={onChange}
                    />}
                </View>
                <Text style={NGCompStyleSheet.PDDateText}>Selected date: {formatDate(dob)}</Text>
            </View>
            <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={saveChanges}>Add And Save</Button>
        </View>
    )
}

export default PlayerDetails