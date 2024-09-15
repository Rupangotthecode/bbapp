import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, TextInput } from 'react-native-paper'
import { ACStyleSheet } from '../../screens/AdminControl/AdminControl_ss'
import { useDispatch } from 'react-redux'
import { postLivelink } from '../../actions/livelinks'

const LiveLinkModal = (props) => {

    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")

    const dispatch = useDispatch()

    const handleAddLink = () => {
        dispatch(postLivelink(props.admin, title, link))
        props.setShowLiveLinkModal(false)
    }

    return (
        <Modal visible={props.showLiveLinkModal} onDismiss={() => props.setShowLiveLinkModal(false)} contentContainerStyle={ACStyleSheet.ACmodalContainer} dismissable={false}>
            <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center", marginBottom: 10 }}>New Live Link</Text>
            <View style={{ padding: "3%" }}>
                <TextInput
                    label="Link Title"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={title}
                    placeholder='Enter Link Title'
                    onChangeText={text => setTitle(text)}
                />
                <TextInput
                    label="Link"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={link}
                    placeholder='Enter Link URL address")'
                    onChangeText={text => setLink(text)}
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={handleAddLink} >
                    Add Link
                </Button>
                <Button mode="outlined" textColor='darkblue' onPress={() => props.setShowLiveLinkModal(false)} >
                    Cancel
                </Button>
            </View>

        </Modal>
    )
}

export default LiveLinkModal