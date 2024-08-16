import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllScores } from '../../actions/scoreboard'
import React, { useEffect } from 'react'
import SBLSS from './ScoreboardList_ss'
import ScoreboardListItem from '../../components/ScoreboardList/ScoreboardListItem'

const ScoreboardList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllScores())
  }, [dispatch])

  const scoreboards = useSelector((state) => state.allScoresReducer)?.data?.result

  console.log("scoreboards", scoreboards)
  return (
    <View style={{ height: "100%", width: "100%", justifyContent: "flex-start" }}>
      <View style={SBLSS.SBLheaderContainer}>
        <Text style={{ fontSize: 22, fontWeight: "600", color: "green" }}>All Scores</Text>
      </View>

      <ScrollView contentContainerStyle={SBLSS.SBLmainContainer}>
        {scoreboards?.map((scoreboard, index) => (
          <ScoreboardListItem gameDetails={scoreboard} key={index} />
        ))}
      </ScrollView>
    </View>

  )
}

export default ScoreboardList