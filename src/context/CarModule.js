import { useReducer } from "react-router-dom";
import axios from "axios";

export const carState = {
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

const [state, dispatch] = useReducer(carState);
