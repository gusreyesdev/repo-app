import Swal from "sweetalert2";
import { Coords } from "../interfaces";
import weatherApi, { VITE_KEY_WEATHER } from "../api/weatherApi";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { onSetWeather } from "../store";

export const useWeatherStore = () => {
  const { weather } = useAppSelector((state) => state.weather);

  const dispatch = useAppDispatch();

  const startLoadingWeather = async (coords: Coords) => {
    const { latitude, longitude } = coords;

    const params = {
      lat: latitude,
      lon: longitude,
      appid: VITE_KEY_WEATHER,
    };

    try {
      const { data } = await weatherApi.get("", { params });

      const weather = data.current.weather[0];
      
      dispatch(onSetWeather(weather.main));

    } catch (error) {
      console.log("error weather ", error);

      Swal.fire({
        title: "Error",
        text: "Error with weatherApi",
        icon: "error",
      });


    }
  };

  return {
    startLoadingWeather,
    weather,
  };
};
