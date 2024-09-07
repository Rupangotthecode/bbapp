import { View, Text, TouchableNativeFeedback, Linking } from 'react-native'
import React from 'react'
import { LLcomp_ss } from './LiveLnkComp_ss'

const LiveLinkBox = (props) => {

    const liveLink = props.liveLink

    const handleLinkPress = () => {
        Linking.canOpenURL(`https://${liveLink.link}`)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(liveLink.link);
                } else {
                    console.error("URL not supported");
                }
            })
            .catch((err) => console.error("Couldn't load page", err));
    };

    return (
        <TouchableNativeFeedback onPress={handleLinkPress}>
            <View style={LLcomp_ss.LLBmainContainer}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 500, color: "darkblue" }}>{liveLink.title}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 500, color: "gray" }}>{liveLink.timeOfPost}</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: "gray" }}>Posted by</Text>
                    <Text style={{ fontSize: 14, fontWeight: 500, color: "darkblue" }}>{liveLink.postedBy}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

export default LiveLinkBox