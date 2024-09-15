import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { NGStyleSheet } from './NewGame_ss'
import NewGameForm from '../../components/NewGame/NewGameForm'

const NewGame = ({ navigation }) => {

    const User = useSelector((state) => state.currentUserReducer)?.result;

    return (
        <View style={NGStyleSheet.NGMainContainer}>
            <View style={NGStyleSheet.NGFormContainer}>
                <NewGameForm navigate={navigation.navigate} user={User} />
            </View>
        </View>
    )
}

export default NewGame