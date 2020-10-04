import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios';

const initialState = {
    cars: [],
    error: null,
    loading: true,
}

let api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-type": "application/json",
    },
})

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    async function getCars(){
        try {
            let res = await api.get("cars/");
            dispatch({
                type: "GET_CARS",
                payload: res.data,
            });
        } catch (error){
            dispatch({
                type: "CAR_ERROR",
                payload: error,
            });
        }
    }

    

    return (
        <GlobalContext.Provider
            value = {{
                cars: state.cars,
                error: state.error,
                loading: state.loading,
                getCars,
            }}>
                {children}
        </GlobalContext.Provider>
    );
}
