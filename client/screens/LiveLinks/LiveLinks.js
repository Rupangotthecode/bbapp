import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LL_ss } from './LiveLinks_ss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLivelinks } from '../../actions/livelinks'
import LiveLinkBox from '../../components/LiveLinks/LiveLinkBox'
import { FAB, PaperProvider, Portal } from 'react-native-paper'
import LiveLinkModal from '../../components/LiveLinks/LiveLinkModal'

const LiveLinks = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log("in useeff")
        dispatch(getAllLivelinks())
    }, [dispatch])

    const liveLinks = useSelector((state) => state.liveLinkReducer)?.result

    console.log("\n\n\n", liveLinks)

    const User = useSelector((state) => state.currentUserReducer)?.result;

    const [showLiveLinkModal, setShowLiveLinkModal] = useState(false)


    console.log(liveLinks)

    return (
        <View style={LL_ss.mainContainer}>
            <View style={LL_ss.headerContainer}>
                <Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center" }}>Live Links</Text>
            </View>
            <View style={LL_ss.linksContainer}>
                <View>
                    {liveLinks ? (<ScrollView contentContainerStyle={{ justifyContent: "flex-start", gap: 10, padding: "3%" }}>
                        {liveLinks.map((liveLink, index) => (
                            <LiveLinkBox liveLink={liveLink} key={index} />
                        ))}
                    </ScrollView>) : (<Text style={{ fontSize: 24, fontWeight: "600", color: "darkblue", textAlign: "center" }}>No links to Show</Text>)}
                </View>
            </View>
            {User && showLiveLinkModal && <View style={{ position: "absolute", width: "100%", height: "100%", zIndex: 15 }}>
                <PaperProvider>
                    <Portal>
                        <LiveLinkModal admin={User} showLiveLinkModal={showLiveLinkModal} setShowLiveLinkModal={setShowLiveLinkModal} />
                    </Portal>
                </PaperProvider>


            </View>}
            {User && <FAB
                icon="plus"
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 20,
                }}
                mode="elevated"
                onPress={() => setShowLiveLinkModal(true)}
            />}
        </View>
    )
}

export default LiveLinks