import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

export const { VITE_API_URL } = getEnvVariables();

const repoApi = axios.create({
  baseURL: VITE_API_URL,
});

export default repoApi;
