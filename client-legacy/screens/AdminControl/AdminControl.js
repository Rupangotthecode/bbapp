import { View, Text } from 'react-native'

import React, { useEffect, useState } from 'react'
import { ACStyleSheet } from './AdminControl_ss'
import { useDispatch, useSelector } from 'react-redux'
import Scorebar from '../../components/Scoreboard/Scorebar'
import { Button, List, Modal, PaperProvider, Portal, RadioButton, TextInput } from 'react-native-paper'
import { startSet, completeToss, endSet } from '../../actions/scoreboard'
import AdminController from '../../components/Scoreboard/AdminController'
import InfoModal from '../../components/Scoreboard/InfoModal'
import ServerModal from '../../components/Scoreboard/ServerModal'
import TossModal from '../../components/Scoreboard/TossModal'
import SetPrepModal from '../../components/Scoreboard/SetPrepModal'
import PlayersModal from '../../components/Scoreboard/PlayersModal'
import SubstitutionModal from '../../components/Scoreboard/SubstitutionModal'
import TimeOutModal from '../../components/Scoreboard/TimeOutModal'
import AddPointModal from '../../components/Scoreboard/AddPointModal'
import EndMatchModal from '../../components/Scoreboard/EndMatchModal'

const AdminControl = ({ navigation }) => {

    const dispatch = useDispatch()

    const [showInfo, setShowInfo] = useState(false);
    const [showToss, setShowToss] = useState(false);
    const [showPrep, setShowPrep] = useState(false);
    const [showServerModalTeam1, setShowServerModalTeam1] = useState(false)
    const [showServerModalTeam2, setShowServerModalTeam2] = useState(false)
    const [showAddPointModalTeam1, setShowAddPointModalTeam1] = useState(false)
    const [showAddPointModalTeam2, setShowAddPointModalTeam2] = useState(false)
    const [showPlayersModalTeam1, setShowPlayersModalTeam1] = useState(false)
    const [showPlayersModalTeam2, setShowPlayersModalTeam2] = useState(false)
    const [showSubModelTeam1, setShowSubModelTeam1] = useState(false)
    const [showSubModelTeam2, setShowSubModelTeam2] = useState(false)
    const [showTimeOutModalTeam1, setShowTimeOutModalTeam1] = useState(false)
    const [showTimeOutModalTeam2, setShowTimeOutModalTeam2] = useState(false)
    const [showEndMatchModal, setShowEndmatchModal] = useState(false)
    const [servers, setServers] = useState([])

    const gameDetails = useSelector((state) => state.scoreboardReducer)?.data?.result
    const setNumber = gameDetails?.setNumber - 1
    console.log(setNumber)
    console.log("ko", gameDetails.lastTeam2Server)
    const initialSelection = !(gameDetails.lastTeam1Server || gameDetails.lastTeam2Server)
    useEffect(() => {
        console.log("use", gameDetails.tossWinner.winner, showToss);

        // Show toss modal if there is no toss winner yet
        if (!gameDetails.tossWinner.winner) {
            console.log("showing toss modal");
            setShowToss(true);
        } else if ((!gameDetails.sets[setNumber] || !gameDetails.sets[setNumber].initialPrep) && !showToss) {
            // Show prep modal if preparation is not done yet
            console.log("showing prep modal");
            setShowPrep(true);
        } else if (gameDetails.sets.length > 0 && gameDetails.sets[setNumber].initialPrep) {
            console.log("hi", initialSelection)
            if (initialSelection && gameDetails.tossWinner.firstService === gameDetails.team1Name) {
                setShowServerModalTeam1(true);
            } else if (initialSelection && gameDetails.tossWinner.firstService === gameDetails.team2Name) {
                setShowServerModalTeam2(true);
            }
        }
    }, [gameDetails, setNumber, showToss, initialSelection]);


    const showInfoModal = () => setShowInfo(true);
    const hideInfoModal = () => setShowInfo(false);

    const handleEndSet = () => {
        setShowPrep(true)
    }

    const handleEndMatch = () => {
        setShowEndmatchModal(true)
    }

    console.log("sno", gameDetails.sets)

    return (
        <View style={ACStyleSheet.ACmainContainer}>
            <View style={ACStyleSheet.ACupperContainer}>
                <Scorebar gameDetails={gameDetails} setNo={gameDetails.setNumber - 1} showModal={showInfoModal} />
            </View>
            <View style={ACStyleSheet.AClowerContainer}>
                <View style={{ height: "40%", padding: "2%" }}>
                    <AdminController teamName={gameDetails.team1Name} players={gameDetails.team1Players} server={gameDetails.lastTeam1Server} mainPlayers={gameDetails.sets[setNumber]?.team1Main} showServerModal={showServerModalTeam1} setShowServerModal={setShowServerModalTeam1} setServers={setServers} showPlayers={showPlayersModalTeam1} setShowPlayers={setShowPlayersModalTeam1} showSub={showSubModelTeam1} setShowSub={setShowSubModelTeam1} showTimeOutModal={showTimeOutModalTeam1} setShowTimeOutModal={setShowTimeOutModalTeam1} setShowAddPointModal={setShowAddPointModalTeam1} />
                </View>
                <View style={{ height: "40%", padding: "2%" }}>
                    <AdminController teamName={gameDetails.team2Name} players={gameDetails.team2Players} mainPlayers={gameDetails.sets[setNumber]?.team2Main} server={gameDetails.lastTeam2Server} showServerModal={showServerModalTeam2} setShowServerModal={setShowServerModalTeam2} setServers={setServers} showPlayers={showPlayersModalTeam2} setShowPlayers={setShowPlayersModalTeam2} showSub={showSubModelTeam2} setShowSub={setShowSubModelTeam2} showTimeOutModal={showTimeOutModalTeam2} setShowTimeOutModal={setShowTimeOutModalTeam2} setShowAddPointModal={setShowAddPointModalTeam2} />
                </View>
                <View style={{ flexDirection: "column", justifyContent: "flex-start", gap: 10 }}>
                    <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleEndSet}>
                        End Set
                    </Button>
                    <Button mode="contained" textColor='white' buttonColor='red' onPress={handleEndMatch}>
                        End Match
                    </Button>
                </View>

                <View style={{ position: "absolute", width: "100%", height: "100%" }}>
                    <PaperProvider>
                        <Portal>
                            <InfoModal gameDetails={gameDetails} showInfo={showInfo} hideInfoModal={hideInfoModal} />
                        </Portal>
                        <Portal>
                            <AddPointModal gameId={gameDetails._id} teamName={gameDetails.team1Name} showAddPointModal={showAddPointModalTeam1} servers={initialSelection ? gameDetails.sets[setNumber]?.team1Main : servers} setShowAddPointModal={setShowAddPointModalTeam1} initialSelection={initialSelection} />
                            <AddPointModal gameId={gameDetails._id} teamName={gameDetails.team2Name} showAddPointModal={showAddPointModalTeam2} servers={initialSelection ? gameDetails.sets[setNumber]?.team2Main : servers} setShowAddPointModal={setShowAddPointModalTeam2} initialSelection={initialSelection} />
                        </Portal>
                        <Portal>
                            <ServerModal gameId={gameDetails._id} teamName={gameDetails.team1Name} showServerModal={showServerModalTeam1} servers={initialSelection ? gameDetails.sets[setNumber]?.team1Main : servers} setShowServerModal={setShowServerModalTeam1} initialSelection={initialSelection} setNumber={setNumber} />
                            <ServerModal gameId={gameDetails._id} teamName={gameDetails.team2Name} showServerModal={showServerModalTeam2} servers={initialSelection ? gameDetails.sets[setNumber]?.team1Main : servers} setShowServerModal={setShowServerModalTeam2} initialSelection={initialSelection} setNumber={setNumber} />
                        </Portal>
                        <Portal>
                            <TossModal setShowToss={setShowToss} showToss={showToss} gameDetails={gameDetails} />
                            <SetPrepModal setShowPrep={setShowPrep} showPrep={showPrep} gameDetails={gameDetails} setNumber={setNumber} />
                            <EndMatchModal showEndMatchModal={showEndMatchModal} setShowEndMatchModal={setShowEndmatchModal} gameDetails={gameDetails} navigate={navigation.navigate} />
                        </Portal>
                        <Portal>
                            <PlayersModal showPlayers={showPlayersModalTeam1} setShowPlayers={setShowPlayersModalTeam1} teamName={gameDetails.team1Name} teamPlayers={gameDetails.team1Players} mainPlayers={gameDetails.sets[setNumber]?.team1Main} teamCoach={gameDetails.team1Coach} teamAsstCoach={gameDetails.team1ACoach} teamManager={gameDetails.team1Manager} />
                            <PlayersModal showPlayers={showPlayersModalTeam2} setShowPlayers={setShowPlayersModalTeam2} teamName={gameDetails.team2Name} teamPlayers={gameDetails.team2Players} mainPlayers={gameDetails.sets[setNumber]?.team2Main} teamCoach={gameDetails.team2Coach} teamAsstCoach={gameDetails.team2ACoach} teamManager={gameDetails.team2Manager} />
                        </Portal>
                        <Portal>
                            <SubstitutionModal showSub={showSubModelTeam1} setShowSub={setShowSubModelTeam1} teamName={gameDetails.team1Name} teamPlayers={gameDetails.team1Players} mainPlayers={gameDetails.sets[setNumber]?.team1Main} gameId={gameDetails._id} />
                            <SubstitutionModal showSub={showSubModelTeam2} setShowSub={setShowSubModelTeam2} teamName={gameDetails.team2Name} teamPlayers={gameDetails.team2Players} mainPlayers={gameDetails.sets[setNumber]?.team2Main} gameId={gameDetails._id} />
                        </Portal>
                        <Portal>
                            <TimeOutModal showTimeOutModal={showTimeOutModalTeam1} setShowTimeOutModal={setShowTimeOutModalTeam1} gameId={gameDetails._id} teamName={gameDetails.team1Name} />
                            <TimeOutModal showTimeOutModal={showTimeOutModalTeam2} setShowTimeOutModal={setShowTimeOutModalTeam2} gameId={gameDetails._id} teamName={gameDetails.team2Name} />
                        </Portal>
                    </PaperProvider>
                </View>
            </View>
        </View>
    )
}

export default AdminControl