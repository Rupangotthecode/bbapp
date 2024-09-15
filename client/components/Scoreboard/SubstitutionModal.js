import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, RadioButton } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { useDispatch } from 'react-redux'
import { manageSubstitution } from '../../actions/scoreboard'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const SubstitutionModal = (props) => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false);
    const [playerIn, setPlayerIn] = useState({})
    const [playerOut, setPlayerOut] = useState({})

    const substitutePlayers = props.teamPlayers?.filter(teamPlayer =>
        !props.mainPlayers?.some(mainPlayer => mainPlayer.playerNo === teamPlayer.playerNo)
    );

    const handleSubstitution = async () => {
        if (playerIn.playerNo && playerOut.playerNo) {
            setIsLoading(true);
            try {
                await dispatch(manageSubstitution(props.gameId, props.teamName, playerIn, playerOut));
                props.setShowSub(false);
                // Reset playerIn and playerOut if needed
                setPlayerIn({ playerNo: null });
                setPlayerOut({ playerNo: null });
            } catch (error) {
                console.error("Error managing substitution:", error);
                alert("An error occurred while managing the substitution. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Please select both players');
        }
    };

    return (
        <Modal visible={props.showSub} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 5 }}>Substitutions</Text>
            <Text style={{ fontSize: 20, fontWeight: "400", color: "darkblue", textAlign: "left", marginBottom: 10 }}>Select team OUT player</Text>
            {props.mainPlayers?.map((player, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value={player.playerNo}
                        status={playerOut.playerNo === player.playerNo ? 'checked' : 'unchecked'}
                        color='darkblue'
                        onPress={() => setPlayerOut(player)}
                    />
                    <Text style={{ fontSize: 14, fontWeight: "400", color: "darkblue", textAlign: "left" }}>{player.playerName} - {player.playerNo}</Text>
                </View>
            ))}
            <Text style={{ fontSize: 20, fontWeight: "400", color: "darkblue", textAlign: "left", marginBottom: 10 }}>Select team IN player</Text>
            {substitutePlayers?.map((player, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value={player.playerNo}
                        status={playerIn.playerNo === player.playerNo ? 'checked' : 'unchecked'}
                        color='darkblue'
                        onPress={() => setPlayerIn(player)}
                    />
                    <Text style={{ fontSize: 14, fontWeight: "400", color: "darkblue", textAlign: "left" }}>{player.playerName} - {player.playerNo}</Text>
                </View>
            ))}
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleSubstitution} >
                    {isLoading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Substitute Players"}
                </Button>
                <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowSub(false)} >
                    Cancel
                </Button>
            </View>

        </Modal>
    )
}

export default SubstitutionModal