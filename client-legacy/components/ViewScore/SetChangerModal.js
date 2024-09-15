import { View, Text } from 'react-native'
import React from 'react'
import { Button, Modal, RadioButton } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'

const SetChangerModal = (props) => {
    return (
        <Modal visible={props.showSetChanger} contentContainerStyle={ACStyleSheet.ACmodalContainer} onDismiss={() => props.setShowSetChanger(false)}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 5 }}>Change Set</Text>
            {Array.from({ length: props.sets.length }, (_, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton
                        value={index}
                        status={props.setNumber === index ? "checked" : "unchecked"}
                        color='darkblue'
                        onPress={() => props.setSetNumber(index)}
                    />
                    <Text style={{ fontSize: 14, fontWeight: "400", color: "darkblue", textAlign: "left" }}>Set {index + 1}</Text>
                </View>
            ))}

        </Modal>
    )
}

export default SetChangerModal