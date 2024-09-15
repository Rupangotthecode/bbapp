import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { manageTimeout } from '../../actions/scoreboard'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useState } from 'react'


const TimeOutModal = (props) => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false);

  const handleTimeout = async () => {
    setIsLoading(true);
    try {
      await dispatch(manageTimeout(props.gameId, props.teamName));
      props.setShowTimeOutModal(false);
    } catch (error) {
      console.error("Error managing timeout:", error);
      alert("An error occurred while managing the timeout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={props.showTimeOutModal} onDismiss={() => props.setShowTimeOutModal(false)} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
      <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>Take Timeout?</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleTimeout} >
          {isLoading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Yes"}
        </Button>
        <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowTimeOutModal(false)} >
          Cancel
        </Button>
      </View>

    </Modal>
  )
}

export default TimeOutModal