import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { About_ss } from './About_ss'
import { aboutApp, history } from './consts'
import fives_measurement from "./fives.png"
import doubles_measurement from "./doubles.png"

const About = () => {
    return (
        <View style={About_ss.mainContainer}>
            <View style={About_ss.headerContainer}>
                <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center" }}>About</Text>
            </View>
            <View style={About_ss.contentContainer}>
                <ScrollView contentContainerStyle={{
                    justifyContent: "flex-start",
                    gap: 15,
                    paddingBottom: "5%"
                }}>
                    <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "left" }}>History</Text>
                    <Text style={{ fontSize: 20, fontWeight: "300", color: "darkblue", textAlign: "left" }}>{history}</Text>
                    <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "left" }}>Court Measurements</Text>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: "darkblue", textAlign: "left" }}>Fives</Text>
                    <Image source={fives_measurement} style={{ width: "100%" }} resizeMode='stretch' />
                    <Text style={{ fontSize: 20, fontWeight: "600", color: "darkblue", textAlign: "left" }}>Doubles</Text>
                    <Image source={doubles_measurement} style={{ width: "100%" }} resizeMode='contain' />
                    <View style={About_ss.aboutAppContainer}>
                        <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "left" }}>About the App</Text>
                        <Text style={{ fontSize: 20, fontWeight: "300", color: "darkblue", textAlign: "left" }}>{aboutApp}</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default About