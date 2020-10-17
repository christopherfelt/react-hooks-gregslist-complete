import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  car: {},
  cars: [],
  error: null,
  loading: true,
};

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  async function getCars() {
    try {
      let res = await api.get("cars/");
      dispatch({
        type: "GET_CARS",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "CAR_ERROR",
        payload: error,
      });
    }
  }

  async function getCar(carId) {
    try {
      let res = await api.get("cars/" + carId);
      dispatch({
        type: "GET_CAR",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "CAR_ERROR",
        payload: error,
      });
    }
  }

  async function createCar(carData) {
    try {
      if (isAuthenticated) {
        console.log(carData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "post",
          url: "http://127.0.0.1:8000/api/cars/create",
          data: carData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getCars();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "CAR_ERROR",
        payload: error,
      });
    }
  }

  async function updateCar(carData) {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const options = {
          method: "put",
          url:
            "http://127.0.0.1:8000/api/cars/" + carData.id + "/updateordelete",
          data: carData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getCar(carData.id);
        getCars();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "CAR_ERROR",
        payload: error,
      });
    }
  }

  async function deleteCar(carId) {
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        const options = {
          method: "delete",
          url: "http://127.0.0.1:8000/api/cars/" + carId + "/updateordelete",
          data: carId,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getCars();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "CAR_ERROR",
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        car: state.car,
        cars: state.cars,
        error: state.error,
        loading: state.loading,
        getCars,
        getCar,
        createCar,
        updateCar,
        deleteCar,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
