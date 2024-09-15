import { View, Text, Image } from 'react-native'
import AddSchedule from '../../components/Schedule/AddSchedule'
import React, { useState } from 'react'
import { ScheduleStyleSheet } from './Schedule_ss'
import { useSelector } from 'react-redux'

const Schedule = ({ navigation }) => {

    const User = useSelector((state) => state.currentUserReducer)?.result;

    return (
        <View style={ScheduleStyleSheet.ScheduleMainContainer}>
            <View style={ScheduleStyleSheet.ScheduleFormContainer}>
                <AddSchedule navigate={navigation.navigate} user={User} />
            </View>
        </View>
    )
}

export default Schedule