import { View, Text } from 'react-native'
import React from 'react'

const TimelineBox = (props) => {

    const matchMessage = props.matchMessage

    return (
        <View style={{ alignSelf: props.align, backgroundColor: props.bgcolor, width: "95%", padding: "2%", borderRadius: 15 }}>
            <View>
                <Text style={{ fontSize: 18, fontWeight: "500", color: "darkblue" }}>{matchMessage.message}</Text>
            </View>
            <View>
                <Text style={{ fontSize: 12, fontWeight: "500", color: "gray" }}>{matchMessage.messageTime.split(" ")[1]}</Text>
            </View>
        </View>
    )
}

export default TimelineBox