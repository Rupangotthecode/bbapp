import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { VScomp_ss } from './VScomp_ss'
import TimelineBox from './TimelineBox'

const Timeline = (props) => {
    const setNumber = props.setNumber
    const gameDetails = props.gameDetails

    const matchMessages = gameDetails.matchMessages.filter((matchMessage) => matchMessage.setNumber === setNumber + 1)
    return (
        <View style={VScomp_ss.timelineMainContainer}>
            <View style={VScomp_ss.timelineUpperContainer}>
                <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue" }}>Set {setNumber + 1} Timeline</Text>
            </View>
            <View style={VScomp_ss.timelineLowerContainer}>
                <View>
                    <ScrollView contentContainerStyle={{ justifyContent: "flex-start", gap: 10 }}>
                        {matchMessages.map((matchMessage, index) => (
                            <TimelineBox matchMessage={matchMessage} key={index} align={
                                matchMessage.team === gameDetails.team1Name
                                    ? "flex-start"
                                    : matchMessage.team === gameDetails.team2Name
                                        ? "flex-end"
                                        : "center"
                            } bgcolor={
                                matchMessage.team === gameDetails.team1Name
                                    ? "#b1f5fc"
                                    : matchMessage.team === gameDetails.team2Name
                                        ? "#5ed1ff"
                                        : "lightgray" // Default background color for the else condition
                            } />))}
                    </ScrollView>
                </View>

            </View>
        </View>
    )
}

export default Timeline