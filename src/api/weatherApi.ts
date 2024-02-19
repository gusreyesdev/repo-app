import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

export const { VITE_WEATHER_URL, VITE_KEY_WEATHER } = getEnvVariables();

const weatherApi = axios.create({
  baseURL: VITE_WEATHER_URL,
});

export default weatherApi;
