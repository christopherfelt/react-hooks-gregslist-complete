import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'
import axios from 'axios';

const initialState = {
    car: {},
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

    async function getCar(carId){
        try {
            let res = await api.get("cars/"+carId+"/")
            dispatch({
                type: "GET_CAR",
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: "CAR_ERROR",
                payload: error,
            })
        }
    }

    async function createCar(carData){
        
        try {
            let res = await api.post("cars/", carData);
            getCars();
        } catch (error) {
            dispatch({
                type: "CAR_ERROR",
                payload: error,
            })
        }
    }

    return (
        <GlobalContext.Provider
            value = {{
                car: state.car,
                cars: state.cars,
                error: state.error,
                loading: state.loading,
                getCars,
                getCar,
                createCar
            }}>
                {children}
        </GlobalContext.Provider>
    );
}
