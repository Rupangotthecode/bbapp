import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, RadioButton } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { useDispatch } from 'react-redux'
import { startSet } from '../../actions/scoreboard'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const SetPrepModal = (props) => {

  const dispatch = useDispatch()

  const gameDetails = props.gameDetails

  const [loading, setLoading] = useState(false);

  const [selectedTeam1Players, setSelectedTeam1Players] = useState([])
  const [selectedTeam2Players, setSelectedTeam2Players] = useState([]);

  const handlePressTeam = (selectedPlayers, setSelectedPlayers, player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== player));
    } else if ((gameDetails.gameType === "doubles" && selectedPlayers.length < 2) || (gameDetails.gameType === "fives" && selectedPlayers.length < 5)) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleBegin = async (gameType) => {
    if ((gameType === "doubles" && selectedTeam1Players.length === 2) || (gameType === "fives" && selectedTeam2Players.length === 5)) {
      setLoading(true);  // Show the activity indicator
      try {
        await dispatch(startSet(selectedTeam1Players, selectedTeam2Players, null, null, gameDetails._id));
        setSelectedTeam1Players([]);
        setSelectedTeam2Players([]);
        props.setShowPrep(false); // Close the modal only after dispatch
      } catch (error) {
        alert("An error occurred. Please try again.");
      } finally {
        setLoading(false);  // Hide the activity indicator
      }
    } else {
      alert("Please select all main players for both teams");
    }
  };

  console.log(gameDetails._id)

  return (
    <Modal visible={props.showPrep} contentContainerStyle={[ACStyleSheet.ACmodalContainer, { height: '92%' }]} dismissable={false}>
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
              {loading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Start Set"}
            </Button>
            <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowPrep(false)} >
              Cancel
            </Button>
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
}

export default SetPrepModal