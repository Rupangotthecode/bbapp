import { View, Text, TouchableNativeFeedback } from 'react-native'
import { useDispatch } from 'react-redux'
import SBLCompSS from './ScoreboardComp_ss'
import React from 'react'
import { getScoreboard } from '../../actions/scoreboard'

const ScoreboardListItem = (props) => {

  const gameDetails = props.gameDetails

  const dispatch = useDispatch()

  const handlePress = () => {
    dispatch(getScoreboard(gameDetails._id))
    props.navigate("ViewScore")
  }

  return (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={SBLCompSS.SBLImainContainer}>
        <View style={SBLCompSS.SBLIleftContainer}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "darkblue" }}>{gameDetails.team1Name} - {gameDetails.team2Name}</Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "darkblue" }}>{gameDetails.tournament}</Text>
          <Text style={{ fontSize: 14, fontWeight: "500", color: "gray" }}>{gameDetails.timeOfStarting}</Text>
        </View>
        <View style={SBLCompSS.SBLIrightContainer}>
          <Text style={{ fontSize: 22, fontWeight: "600", color: "darkblue" }}>{gameDetails.team1MatchPoints} - {gameDetails.team2MatchPoints}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

export default ScoreboardListItem