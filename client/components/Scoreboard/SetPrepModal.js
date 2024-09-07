import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, RadioButton } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { useDispatch } from 'react-redux'
import { startSet } from '../../actions/scoreboard'

const SetPrepModal = (props) => {

  const dispatch = useDispatch()

  const gameDetails = props.gameDetails

  const [selectedTeam1Players, setSelectedTeam1Players] = useState([])
  const [selectedTeam2Players, setSelectedTeam2Players] = useState([]);

  const handlePressTeam = (selectedPlayers, setSelectedPlayers, player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== player));
    } else if (selectedPlayers.length < 2) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleBegin = (gameType) => {
    console.log(selectedTeam1Players.length, selectedTeam2Players.length)
    if ((gameType === "doubles" && selectedTeam1Players.length === 2) || (gameType === "fives" && selectedTeam2Players.length === 5)) {
      dispatch(startSet(selectedTeam1Players, selectedTeam2Players, null, null, gameDetails._id))
      setSelectedTeam1Players([])
      setSelectedTeam2Players([])
      props.setShowPrep(false)
    }
    else {
      alert("Please select all main players for both teams")
    }

  }

  return (
    <Modal visible={props.showPrep} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
      <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 5 }}>New Set</Text>
      <Text style={{ fontSize: 20, fontWeight: "400", color: "darkblue", textAlign: "left", marginBottom: 10 }}>Select team 1 starting players</Text>
      {gameDetails.team1Players.map((player, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value={player.playerNo}
            status={selectedTeam1Players.includes(player) ? 'checked' : 'unchecked'}
            color='darkblue'
            onPress={() => handlePressTeam(selectedTeam1Players, setSelectedTeam1Players, player)}
          />
          <Text style={{ fontSize: 14, fontWeight: "400", color: "darkblue", textAlign: "left" }}>{player.playerName} - {player.playerNo}</Text>
        </View>
      ))}
      <Text style={{ fontSize: 20, fontWeight: "400", color: "darkblue", textAlign: "left", marginBottom: 10 }}>Select team 2 starting players</Text>
      {gameDetails.team2Players.map((player, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value={player.playerNo}
            status={selectedTeam2Players.includes(player) ? 'checked' : 'unchecked'}
            color='darkblue'
            onPress={() => handlePressTeam(selectedTeam2Players, setSelectedTeam2Players, player)}
          />
          <Text style={{ fontSize: 14, fontWeight: "400", color: "darkblue", textAlign: "left" }}>{player.playerName} - {player.playerNo}</Text>
        </View>
      ))}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={() => handleBegin(gameDetails.gameType)} >
          Start Set
        </Button>
        <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowPrep(false)} >
          Cancel
        </Button>
      </View>

    </Modal>
  )
}

export default SetPrepModal