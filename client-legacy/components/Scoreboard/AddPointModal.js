import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { addPoint, manageTimeout } from '../../actions/scoreboard'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'

const AddPointModal = (props) => {

    const dispatch = useDispatch()

    const handleAddPoint = () => {
        dispatch(addPoint(props.gameId, props.teamName))
        props.setShowAddPointModal(false)
    }

    return (
        <Modal visible={props.showAddPointModal} onDismiss={() => props.setShowAddPointModal(false)} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Add Point?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleAddPoint} >
                    Yes
                </Button>
                <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowAddPointModal(false)} >
                    Cancel
                </Button>
            </View>

        </Modal>
    )
}

export default AddPointModal