import { ScrollView, View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, SegmentedButtons, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import PlayerDetails from './PlayerDetails'
import { NGCompStyleSheet } from './NewGameComp_ss'
import { startGame } from '../../actions/scoreboard';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const NewGameForm = (props) => {

    const dispatch = useDispatch()

    const [tournament, setTournament] = useState("")
    const [organizer, setOrganizer] = useState("")
    const [venue, setVenue] = useState("")
    const [team1, setTeam1] = useState("")
    const [team1Manager, setTeam1Manager] = useState("")
    const [team1Coach, setTeam1Coach] = useState("")
    const [team1ACoach, setTeam1ACoach] = useState("")
    const [team2Manager, setTeam2Manager] = useState("")
    const [team2Coach, setTeam2Coach] = useState("")
    const [team2ACoach, setTeam2ACoach] = useState("")
    const [team2, setTeam2] = useState("")
    const [poolNo, setPoolNo] = useState("")
    const [matchNo, setmatchNo] = useState("")
    const [gameType, setGameType] = useState("")
    const [team1List, setTeam1List] = useState([])
    const [team2List, setTeam2List] = useState([])
    const [team1Logo, setTeam1Logo] = useState(null)
    const [team2Logo, setTeam2Logo] = useState(null)
    const [team1LogoPreview, setTeam1LogoPreview] = useState(null)
    const [team2LogoPreview, setTeam2LogoPreview] = useState(null)

    const handleImagePick = async (setImage, setImagePreview) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            setImage(base64);
            console.log(result.assets[0].uri)
            setImagePreview(result.assets[0].uri);
        }
    };

    const [loading, setLoading] = useState(false);

    const handleStartGame = async () => {
        // Create the scoreboardData object
        const scoreboardData = {
            tournament: tournament,
            organizer: organizer,
            venue: venue,
            team1: team1,
            team1Manager: team1Manager,
            team1Coach: team1Coach,
            team1ACoach: team1ACoach,
            team2: team2,
            team2Manager: team2Manager,
            team2Coach: team2Coach,
            team2ACoach: team2ACoach,
            admin: props.user,
            poolNo: poolNo,
            matchNo: matchNo,
            gameType: gameType,
            team1List: team1List,
            team2List: team2List,
            team1Logo: team1Logo,
            team2Logo: team2Logo,
            team1LogoPreview: team1LogoPreview,
            team2LogoPreview: team2LogoPreview,
        };

        // Check if all fields are filled
        const allFieldsFilled = Object.values(scoreboardData).every((value) => {
            if (Array.isArray(value)) return value.length > 0;
            if (typeof value === "object") return value !== null;
            return value !== "";
        });

        // Check if player details are satisfied
        const playerDetailsSatisfied = scoreboardData.team1List.every((value) => {
            return value.playerName !== "" && value.playerNo !== "";
        });

        if (allFieldsFilled) {
            if (((scoreboardData.gameType === "doubles" && scoreboardData.team1List.length === 3) ||
                (scoreboardData.gameType === "fives" && scoreboardData.team1List.length === 10)) && playerDetailsSatisfied) {
                setLoading(true);  // Show activity indicator
                try {
                    await dispatch(startGame(scoreboardData, props.navigate));
                } catch (error) {
                    alert("An error occurred. Please try again.");
                } finally {
                    setLoading(false);  // Hide activity indicator
                }
            } else {
                alert("Please fill in all the fields before starting the game.");
            }
        } else {
            alert("Please fill in all the fields before starting the game.");
        }
    };

    const handleTypeChange = (value) => {
        setGameType(value)
        setTeam1List([])
        setTeam2List([])
    }

    return (
        <ScrollView contentContainerStyle={NGCompStyleSheet.NGFMainContainer}>
            <View style={NGCompStyleSheet.NGFUpperContainer}>
                <Text style={NGCompStyleSheet.NGFHeaderText}>New Game</Text>
            </View>
            <View style={NGCompStyleSheet.NGFLowerContainer}>
                <TextInput
                    label="Tournament"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={tournament}
                    placeholder='Enter Tournament Name, (ex: "SRM BB championship 2024")'
                    onChangeText={text => setTournament(text)}
                />
                <TextInput
                    label="Organizer"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={organizer}
                    placeholder='Enter Organizer Name'
                    onChangeText={text => setOrganizer(text)}
                />
                <TextInput
                    label="Venue"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={venue}
                    placeholder='Enter venue of Event'
                    onChangeText={text => setVenue(text)}
                />
                <TextInput
                    label="Team 1 Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team1}
                    placeholder='Enter Name For The First Team'
                    onChangeText={text => setTeam1(text)}
                />
                <View style={NGCompStyleSheet.NGFImageContainer}>
                    <View style={NGCompStyleSheet.NGFImageUpperContainer}>
                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 20 }}>Add Team 1 Logo:</Text>
                        <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={() => handleImagePick(setTeam1Logo, setTeam1LogoPreview)}>Browse</Button>
                    </View>
                    <View style={NGCompStyleSheet.NGFImageLowerContainer}>
                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 20 }}>Your Selection:</Text>
                        {team1LogoPreview && <Image source={{ uri: team1LogoPreview }} style={{ width: 100, height: 100 }} />}
                    </View>
                </View>

                <TextInput
                    label="Team 1 Manager Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team1Manager}
                    placeholder="Enter Name For The First Team's Manager"
                    onChangeText={text => setTeam1Manager(text)}
                />
                <TextInput
                    label="Team 1 Coach Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team1Coach}
                    placeholder="Enter Name For The First Team's Coach"
                    onChangeText={text => setTeam1Coach(text)}
                />
                <TextInput
                    label="Team 1 Asst. Coach Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team1ACoach}
                    placeholder="Enter Name For The First Team's Asst. Coach"
                    onChangeText={text => setTeam1ACoach(text)}
                />
                <TextInput
                    label="Team 2 Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team2}
                    placeholder='Enter Name For The Second Team'
                    onChangeText={text => setTeam2(text)}
                />
                <View style={NGCompStyleSheet.NGFImageContainer}>
                    <View style={NGCompStyleSheet.NGFImageUpperContainer}>
                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 20 }}>Add Team 2 Logo:</Text>
                        <Button mode="contained" textColor='white' buttonColor='darkblue' onPress={() => handleImagePick(setTeam2Logo, setTeam2LogoPreview)}>Browse</Button>
                    </View>
                    <View style={NGCompStyleSheet.NGFImageLowerContainer}>
                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 20 }}>Your Selection:</Text>
                        {team2LogoPreview && <Image source={{ uri: team2LogoPreview }} style={{ width: 100, height: 100 }} />}
                    </View>
                </View>
                <TextInput
                    label="Team 2 Manager Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team2Manager}
                    placeholder="Enter Name For The Second Team's Manager"
                    onChangeText={text => setTeam2Manager(text)}
                />
                <TextInput
                    label="Team 2 Coach Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team2Coach}
                    placeholder="Enter Name For The Second Team's Coach"
                    onChangeText={text => setTeam2Coach(text)}
                />
                <TextInput
                    label="Team 2 Asst. Coach Name"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={team2ACoach}
                    placeholder="Enter Name For The Second Team's Asst. Coach"
                    onChangeText={text => setTeam2ACoach(text)}
                />
                <TextInput
                    label="Pool Number"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={poolNo}
                    placeholder='Enter pool number of the match'
                    onChangeText={text => setPoolNo(text)}
                />
                <TextInput
                    label="Match Number"
                    outlineColor='darkblue'
                    activeOutlineColor='darkblue'
                    mode='outlined'
                    value={matchNo}
                    placeholder='Enter match number of the match'
                    onChangeText={text => setmatchNo(text)}
                />
                <SegmentedButtons
                    value={gameType}
                    onValueChange={handleTypeChange}

                    buttons={[
                        {
                            value: 'doubles',
                            label: 'Doubles',
                        },
                        {
                            value: 'fives',
                            label: 'Fives',
                        },
                    ]}
                />
                {gameType === "fives" ? (
                    <View>
                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 26 }}>Team 1</Text>
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={1} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={2} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={3} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={4} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={5} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={6} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={7} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={8} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={9} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={10} playersList={team1List} setPlayersList={setTeam1List} />



                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 26, marginTop: 25 }}>Team 2</Text>
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={1} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={2} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={3} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={4} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={5} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={6} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={7} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={8} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={9} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={10} playersList={team2List} setPlayersList={setTeam2List} />
                    </View>
                ) : (
                    <View>
                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 26 }}>Team 1</Text>
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={1} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={2} playersList={team1List} setPlayersList={setTeam1List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={3} playersList={team1List} setPlayersList={setTeam1List} />

                        <Text style={{ fontWeight: "500", color: "darkblue", fontSize: 26, marginTop: 25 }}>Team 2</Text>
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={1} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={2} playersList={team2List} setPlayersList={setTeam2List} />
                        <Divider bold style={{ backgroundColor: "darkblue", height: 1 }} />
                        <PlayerDetails id={3} playersList={team2List} setPlayersList={setTeam2List} />
                    </View>
                )}
                <Button mode="contained" textColor='white' buttonColor='darkblue'
                    onPress={() => handleStartGame()}>
                    {loading ? <ActivityIndicator animating={true} color={MD2Colors.white} /> : "Start Game"}
                </Button>
            </View>
        </ScrollView>
    )
}

export default NewGameForm