import { View, Text } from 'react-native'
import SBLCompSS from './ScoreboardComp_ss'
import React from 'react'

const ScoreboardListItem = (props) => {

  const gameDetails = props.gameDetails

  return (
    <View style={SBLCompSS.SBLImainContainer}>
      <View style={SBLCompSS.SBLIleftContainer}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "green" }}>{gameDetails.team1Name} - {gameDetails.team2Name}</Text>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "green" }}>{gameDetails.tournament}</Text>
        <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>{gameDetails.timeOfStarting}</Text>
      </View>
      <View style={SBLCompSS.SBLIrightContainer}>
        <Text style={{ fontSize: 22, fontWeight: "600", color: "green" }}>{gameDetails.team1MatchPoints} - {gameDetails.team2MatchPoints}</Text>
      </View>
    </View>
  )
}

export default ScoreboardListItem