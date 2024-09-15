import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = { data: null };

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH":
            AsyncStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
            return { ...state, data: action?.data };

        case "AUTH_UPDATE":
            const updateProfile = async () => {
                const prevUserString = await AsyncStorage.getItem("Profile");
                const prevUser = JSON.parse(prevUserString);

                const updatedUser =
                    typeof prevUser === "object"
                        ? { ...prevUser, result: action?.data }
                        : { result: action?.data };

                await AsyncStorage.setItem("Profile", JSON.stringify(updatedUser));
                return { ...state, data: action?.data };
            };

            updateProfile();
            return { ...state, data: action?.data };

        default:
            return state;
    }
};

export default authReducer;