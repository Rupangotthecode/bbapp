import { View, Text, Image } from 'react-native'
import { Button, Modal, PaperProvider, Portal } from 'react-native-paper'
import React, { useState } from 'react'
import { SBCstyleSheet } from './ScoreboardComp_ss'

const Scorebar = (props) => {


    return (
        <View style={SBCstyleSheet.SBmainContainer}>
            <View style={SBCstyleSheet.SBleftContainer}>
                <View style={SBCstyleSheet.SBsetScoreContainer}>
                    <View style={SBCstyleSheet.SBlogoContainer}>
                        <Image
                            source={{ uri: `data:image/png;base64,${props.gameDetails.team1Logo}` }}
                            style={SBCstyleSheet.SBlogo}
                        />
                    </View>
                    <Text style={SBCstyleSheet.SBsetScoretext}>{props.gameDetails.sets[props.setNo] ? props.gameDetails.sets[props.setNo].team1Score : 0}</Text>
                    <Text style={SBCstyleSheet.SBsetScoretext}>:</Text>
                    <Text style={SBCstyleSheet.SBsetScoretext}>{props.gameDetails.sets[props.setNo] ? props.gameDetails.sets[props.setNo].team2Score : 0}</Text>
                    <View style={SBCstyleSheet.SBlogoContainer}>
                        <Image
                            source={{ uri: `data:image/png;base64,${props.gameDetails.team2Logo}` }}
                            style={SBCstyleSheet.SBlogo}
                        />
                    </View>
                </View>
                <View style={SBCstyleSheet.SBmatchScoreContainer}>
                    <Text style={SBCstyleSheet.SBmatchScoretext}>{props.gameDetails.team1MatchPoints}</Text>
                    <Text style={SBCstyleSheet.SBmatchScoretext}>:</Text>
                    <Text style={SBCstyleSheet.SBmatchScoretext}>{props.gameDetails.team2MatchPoints}</Text>
                </View>
            </View>
            <View style={SBCstyleSheet.SBrightContainer}>
                <Button mode='text' icon="information-outline" textColor='darkblue' labelStyle={{ fontSize: 50, fontWeight: 700, padding: 0 }} style={{ justifyContent: "center", alignItems: "center" }} compact={true} onPress={props.showModal}></Button>
            </View>
        </View>
    )
}

export default Scorebar