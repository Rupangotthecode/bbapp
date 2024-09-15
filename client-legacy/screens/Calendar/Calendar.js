import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { formatAgentaItems, getMarkedDates } from '../../components/Calendar/AgendaItems';
import React, { useEffect, useRef } from 'react'
import CalendarComp from '../../components/Calendar/CalendarComp'
import { getAllSchedules } from '../../actions/schedule';

const Calendar = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSchedules())
    }, [dispatch])

    const schedules = useSelector((state) => state.schedulesReducer)?.result

    console.log("schedules in calendar", schedules)

    return (
        <View style={{ height: "100%" }}>
            {schedules && <CalendarComp schedules={schedules} />}
        </View>
    )
}

export default Calendar