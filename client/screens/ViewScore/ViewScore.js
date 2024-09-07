import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Scorebar from '../../components/Scoreboard/Scorebar'
import { FAB, PaperProvider, Portal } from 'react-native-paper'
import InfoModal from '../../components/Scoreboard/InfoModal'
import { VS_ss } from './ViewScore_ss'
import SetChangerModal from '../../components/ViewScore/SetChangerModal'
import Timeline from '../../components/ViewScore/Timeline'

const ViewScore = () => {

    const gameDetails = useSelector(state => state.scoreboardReducer)?.data?.result

    const [showInfo, setShowInfo] = useState(false);

    const [showSetChanger, setShowSetChanger] = useState(false)
    const [setNumber, setSetNumber] = useState(0)

    const showInfoModal = () => setShowInfo(true);
    const hideInfoModal = () => setShowInfo(false);

    console.log("\n\n\n\n", gameDetails)

    return (
        <View style={VS_ss.mainContainer}>
            {gameDetails && <View style={VS_ss.mainContainer}>
                <View style={VS_ss.scorebarContainer}>
                    <Scorebar gameDetails={gameDetails} setNo={setNumber} showModal={showInfoModal} />
                </View>
                <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: 15 }}>
                    <PaperProvider>
                        <Portal>
                            <InfoModal gameDetails={gameDetails} showInfo={showInfo} hideInfoModal={hideInfoModal} />
                            <SetChangerModal setShowSetChanger={setShowSetChanger} showSetChanger={showSetChanger} sets={gameDetails.sets} setNumber={setNumber} setSetNumber={setSetNumber} />
                        </Portal>
                    </PaperProvider>
                    <FAB
                        label='Change Set'
                        mode="elevated"
                        style={VS_ss.fab}
                        onPress={() => setShowSetChanger(true)}
                    />
                </View>
                <View style={VS_ss.contentContainer}>
                    <View style={VS_ss.winnerContainer}>
                        <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "left", padding: "2%" }}>Set Winner: {gameDetails.sets[setNumber].setWinner}</Text>
                    </View>
                    <View style={VS_ss.timelineContainer}>
                        <Timeline setNumber={setNumber} gameDetails={gameDetails} />
                    </View>
                </View>
            </View>}
        </View>
    )
}

export default ViewScore