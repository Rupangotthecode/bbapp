import { View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { FAB, SegmentedButtons } from 'react-native-paper'
import { getAllScores } from '../../actions/scoreboard'
import React, { useEffect, useState } from 'react'
import SBLSS from './ScoreboardList_ss'
import ScoreboardListItem from '../../components/ScoreboardList/ScoreboardListItem'
import Buffer from '../../components/Buffer/Buffer'


const ScoreboardList = ({ navigation }) => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Show the activity indicator
      try {
        await dispatch(getAllScores());
      } catch (error) {
        alert("Failed to retrieve scores. Please try again.");
      } finally {
        setLoading(false);  // Hide the activity indicator
      }
    };

    fetchData();
  }, [dispatch]);

  const [scoresType, setScoresType] = useState("live")

  const handleTypeChange = (value) => {
    setScoresType(value)
  }
  const User = useSelector((state) => state.currentUserReducer)?.result;
  const scoreboards = useSelector((state) => state.allScoresReducer)?.data?.result

  const liveScores = scoreboards?.filter((score) => score.matchStatus === "in progress")
  const completedScores = scoreboards?.filter((score) => score.matchStatus === "Completed")

  return (
    <View style={{ height: "100%", width: "100%" }}>
      {loading ? <Buffer /> : (
        <View style={{ height: "100%", width: "100%", justifyContent: "flex-start", gap: 10 }}>
          <View style={SBLSS.SBLheaderContainer}>
            <Text style={{ fontSize: 22, fontWeight: "600", color: "darkblue" }}>All Scores</Text>
          </View>
          <View style={{ justifyContent: "flex-start", gap: 10 }} >
            <View style={{ width: "100%", padding: "2%", paddingBottom: 0 }}>
              <SegmentedButtons
                value={scoresType}
                onValueChange={handleTypeChange}

                buttons={[
                  {
                    value: 'live',
                    label: 'Live',
                  },
                  {
                    value: 'completed',
                    label: 'Previous',
                  },
                ]}
              /></View>
            {scoresType === "completed" ? (<View>
              <View style={{ width: "100%", padding: "2%" }}>
                <Text style={SBLSS.SBLheader}>Completed Scores</Text>
              </View>
              <ScrollView contentContainerStyle={SBLSS.SBLscrollContainer}>
                {completedScores?.map((scoreboard, index) => (
                  <ScoreboardListItem gameDetails={scoreboard} navigate={navigation.navigate} navLocation={"ViewScore"} setLoading={setLoading} key={index} />
                ))}
              </ScrollView>
            </View>) : (<View>
              <View style={{ width: "100%", padding: "2%" }}>
                <Text style={SBLSS.SBLheader}>Live Scores</Text>
              </View>
              <ScrollView contentContainerStyle={SBLSS.SBLscrollContainer}>
                {liveScores?.map((scoreboard, index) => (
                  <ScoreboardListItem gameDetails={scoreboard} navigate={navigation.navigate} navLocation={User?.username === scoreboard.admin ? "AdminControl" : "ViewScore"} setLoading={setLoading} key={index} />
                ))}
              </ScrollView>
            </View>)}
          </View>
        </View>)}


    </View>

  )
}

export default ScoreboardList