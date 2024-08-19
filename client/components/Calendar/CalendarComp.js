import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import AgendaItem from './AgendaItem';
import { formatAgentaItems, getMarkedDates } from './AgendaItems';
import React, { useCallback, useEffect, useRef } from 'react'

const CalendarComp = (props) => {

    const agendaItems = formatAgentaItems(props.schedules)

    const marked = useRef(getMarkedDates(agendaItems));

    const renderItem = useCallback(({ item }) => {
        console.log(item)
        return <AgendaItem item={item} style={{ height: 600 }} />;
    }, []);

    const getItemLayout = (data, index) => (
        { length: 100, offset: 100 * index, index }
    );

    return (
        <CalendarProvider date={'2024-07-31'} style={{ height: "100%" }}>
            <ExpandableCalendar
                markedDates={marked.current}
                theme={{
                    backgroundColor: 'white', // Change this to your desired background color
                    calendarBackground: 'white', // Change this to your desired calendar background color
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: 'darkblue',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: 'darkblue',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: 'teal',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'darkblue',
                    monthTextColor: 'darkblue',
                    indicatorColor: 'darkblue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                }}
            />
            <AgendaList
                sections={agendaItems}

                renderItem={renderItem}
                sectionStyle={{ backgroundColor: 'lightgrey' }}
                style={{ height: 600 }}
                getItemLayout={getItemLayout}
            />
        </CalendarProvider>
    );
};

export default CalendarComp
