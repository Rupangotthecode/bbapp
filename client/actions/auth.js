import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import AsyncStorage from '@react-native-async-storage/async-storage';

class CustomError extends Error {
    constructor(message, heading) {
        super(message);
        this.heading = heading;
    }
}

export const signup = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(authData);
        dispatch({ type: "AUTH", data });

        await AsyncStorage.setItem("Profile", JSON.stringify(data));
        const profile = await AsyncStorage.getItem("Profile");
        dispatch(setCurrentUser(JSON.parse(profile)));

        if (navigate) {
            navigate("Home");
        }
    } catch (error) {
        throw new CustomError(error.response.data.message, "Signup unsuccessful!");
    }
};

export const login = (authData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.logIn(authData);
        dispatch({ type: "AUTH", data });

        await AsyncStorage.setItem("Profile", JSON.stringify(data));
        const profile = await AsyncStorage.getItem("Profile");
        dispatch(setCurrentUser(JSON.parse(profile)));

        if (navigate) {
            navigate("Home");
        }
    } catch (error) {
        throw new CustomError(error.response.data.message, "Login unsuccessful!");
    }
};

export const logout = (navigate) => async (dispatch) => {
    try {
        AsyncStorage.removeItem("Profile");
        const profile = await AsyncStorage.getItem("Profile");
        dispatch(setCurrentUser(JSON.parse(profile)));
        if (navigate) {
            navigate("Home");
        }
    } catch (error) {
        console.log(error);
    }
};

export const persistLogin = () => async (dispatch) => {
    try {
        // const authData = JSON.parse(localStorage.getItem("Profile")).result;
        // console.log(authData);
        // dispatch(login(authData));
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    } catch (error) {
        console.log(error);
    }
};