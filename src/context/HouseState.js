import React, { createContext, useReducer } from "react";
import HouseAppReducer from "./HouseAppReducer";
import axios from "axios";

const initialState = {
  house: {},
  houses: [],
  error: null,
  loading: true,
};

let api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export const HouseContext = createContext(initialState);

export const HouseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HouseAppReducer, initialState);

  async function getHouses() {
    try {
      let res = await api.get("houses/");
      dispatch({
        type: "GET_HOUSES",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  async function getHouse(houseId) {
    try {
      let res = await api.get("houses/" + houseId);
      dispatch({
        type: "GET_HOUSE",
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  async function createHouse(houseData) {
    try {
      await api.post("houses/", houseData);
      getHouses();
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  async function updateHouse(houseData) {
    try {
      await api.put("houses/" + houseData.id + "/");
      getHouses();
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  async function deleteHouse(houseId) {
    try {
      await api.delete("houses/" + houseId + "/");
      getHouses();
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  return (
    <HouseContext.Provider
      value={{
        house: state.house,
        houses: state.houses,
        error: state.error,
        loading: state.loading,
        getHouses,
        getHouse,
        createHouse,
        updateHouse,
        deleteHouse,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};
