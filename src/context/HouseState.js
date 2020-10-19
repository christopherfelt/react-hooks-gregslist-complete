import React, { createContext, useReducer } from "react";
import HouseAppReducer from "./HouseAppReducer";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

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

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

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
      if (isAuthenticated) {
        console.log(houseData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "post",
          url: "http://127.0.0.1:8000/api/houses/create",
          data: houseData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getHouses();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  async function updateHouse(houseData) {
    try {
      if (isAuthenticated) {
        console.log(houseData);
        const token = await getAccessTokenSilently();
        const options = {
          method: "put",
          url:
            "http://127.0.0.1:8000/api/houses/" +
            houseData.id +
            "/updateordelete",
          data: houseData,
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getHouse(houseData.id);
        getHouses();
      } else {
        console.log("You are not authenticated to make this request");
      }
    } catch (error) {
      dispatch({
        type: "HOUSE_ERROR",
        payload: error,
      });
    }
  }

  async function deleteHouse(houseId) {
    try {
      if (isAuthenticated) {
        console.log(houseId);
        const token = await getAccessTokenSilently();
        const options = {
          method: "delete",
          url:
            "http://127.0.0.1:8000/api/houses/" + houseId + "/updateordelete",
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        };
        await axios(options);
        getHouses();
      } else {
        console.log("You are not authenticated to make this request");
      }
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
