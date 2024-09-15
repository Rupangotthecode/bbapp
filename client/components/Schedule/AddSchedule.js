import { View, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ScheduleCompStyleSheet } from './ScheduleComp_ss.js'
import { addSchedule } from '../../actions/schedule.js'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const AddSchedule = (props) => {

    const dispatch = useDispatch()

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState("")
    const [tournament, setTournament] = useState("")
    const [time, setTime] = useState("")
    const [duration, setDuration] = useState("")
    const [poolNo, setPoolNo] = useState("")
    const [matchNo, setmatchNo] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, value) => {
        setDate(value)
        setOpenDate(false)
    }

    const onSubmit = async () => {
        if (date && title && tournament && time) {
            setIsLoading(true);

            const scheduleData = {
                title: formatDate(date),
                itemTime: time,
                duration: duration,
                itemTournament: tournament,
                itemTitle: title,
                poolNo: poolNo,
                matchNo: matchNo,
                user: props.user
            };

            try {
                await dispatch(addSchedule(scheduleData, props.navigate));
            } catch (error) {
                console.error("Error adding schedule:", error);
                alert("An error occurred while adding the schedule. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("Please fill in all required fields");
        }
    };

    return (
        <View style={ScheduleCompStyleSheet.scheduleMainContainer}>
            <View style={ScheduleCompStyleSheet.scheduleUpperContainer}>
                <Text style={ScheduleCompStyleSheet.scheduleHeaderText}>Schedule a Game</Text>
            </View>
            <View style={ScheduleCompStyleSheet.scheduleLowerContainer}>
                <TextInput
                    label="Title"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={title}
                    placeholder='Enter Event Title, (ex: "Team A vs Team B")'
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    label="Tournament/Competition Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={tournament}
                    placeholder='Enter Tournament Name, (ex: "SRM BB championship 2024")'
                    onChangeText={text => setTournament(text)}
                />
                <View style={ScheduleCompStyleSheet.scheduleDateContainer}>

                    <View style={ScheduleCompStyleSheet.scheduleDateUpperContainer}>
                        <Text style={ScheduleCompStyleSheet.scheduleDateText}>Enter Event Date: </Text>
                        <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={() => setOpenDate(true)}>
                            Enter Event Date
                        </Button>
                        {openDate && <DateTimePicker
                            value={date}
                            is24Hour={true}
                            onChange={onChange}
                        />}
                    </View>
                    <Text style={ScheduleCompStyleSheet.scheduleDateText}>Selected date: {formatDate(date)}</Text>
                </View>
                <TextInput
                    label="Time of Event"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={time}
                    placeholder='Enter time of Event(ex: 2pm)'
                    onChangeText={text => setTime(text)}
                />
                <TextInput
                    label="Duration(optional)"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={duration}
                    placeholder='Enter time required for event completion, (ex: "2h or 30m")'
                    onChangeText={text => setDuration(text)}
                />
                <TextInput
                    label="Pool Number(optional)"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={poolNo}
                    placeholder='Enter pool number of the match'
                    onChangeText={text => setPoolNo(text)}
                />
                <TextInput
                    label="Match Number(optional)"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={matchNo}
                    placeholder='Enter match number of the match'
                    onChangeText={text => setmatchNo(text)}
                />
                <Button mode="contained" textColor='white' buttonColor='darkblue'
                    onPress={onSubmit}>
                    {isLoading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Add To Schedule"}
                </Button>
            </View>
        </View>
    )
}

export default AddSchedule