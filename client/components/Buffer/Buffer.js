import { View, Text } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import React from 'react'

const Buffer = () => {
    return (
        <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: "#ffffff66", justifyContent: 'center', alignItems: "center" }}>
            <ActivityIndicator size="large" animating={true} color={MD2Colors.blue700} />
        </View>
    )
}

export default Buffer