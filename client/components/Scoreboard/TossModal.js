import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, RadioButton } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { useDispatch } from 'react-redux'
import { completeToss } from '../../actions/scoreboard'

const TossModal = (props) => {

  const gameDetails = props.gameDetails

  const dispatch = useDispatch()

  const [tossWinner, setTossWinner] = useState("")
  const [firstServer, setFirstServer] = useState("")

  const handleToss = () => {
    dispatch(completeToss(tossWinner, firstServer, gameDetails._id, props.setShowToss));
  };

  return (
    <Modal visible={props.showToss} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
      <Text style={{ fontSize: 24, fontWeight: "600", color: "green", textAlign: "center", marginBottom: 10 }}>Toss results</Text>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "green", textAlign: "left" }}>Toss Winning Team:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value={gameDetails.team1Name}

            status={tossWinner === gameDetails.team1Name ? "checked" : "unchecked"}
            color='green'
            onPress={() => setTossWinner(gameDetails.team1Name)}
          />
          <Text style={{ fontSize: 14, fontWeight: "400", color: "green", textAlign: "left" }}>{gameDetails.team1Name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value={gameDetails.team2Name}
            status={tossWinner === gameDetails.team2Name ? "checked" : "unchecked"}
            color='green'
            onPress={() => setTossWinner(gameDetails.team2Name)}
          /><Text style={{ fontSize: 14, fontWeight: "400", color: "green", textAlign: "left" }}>{gameDetails.team2Name}</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "green", textAlign: "left" }}>First Service Team:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value={gameDetails.team1Name}
            status={firstServer === gameDetails.team1Name ? "checked" : "unchecked"}
            color='green'
            onPress={() => setFirstServer(gameDetails.team1Name)}
          />
          <Text style={{ fontSize: 14, fontWeight: "400", color: "green", textAlign: "left" }}>{gameDetails.team1Name}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton
            value={gameDetails.team2Name}
            status={firstServer === gameDetails.team2Name ? "checked" : "unchecked"}
            color='green'
            onPress={() => setFirstServer(gameDetails.team2Name)}
          /><Text style={{ fontSize: 14, fontWeight: "400", color: "green", textAlign: "left" }}>{gameDetails.team2Name}</Text>
        </View>
      </View>
      <Button mode="contained" textColor='white' buttonColor='green' onPress={handleToss} >
        Submit Toss Results
      </Button>
    </Modal>
  )
}

export default TossModal