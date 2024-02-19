import { useEffect, useState } from "react";
import { useWeatherStore } from "../hooks";
import { Coords } from "../interfaces";

export const Weather = () => {
  const [permission, setPermissions] = useState(false);

  const { weather } = useWeatherStore();

  const [coords, setCoords] = useState<Coords>();

  const { startLoadingWeather } = useWeatherStore();

  const getPermissionGeo = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        const { state } = permissionStatus;

        if (state === "prompt" || state === "denied") {
          setPermissions(false);
          getUserCoords();
        } else if (state === "granted") {
          getUserCoords();
        }

        permissionStatus.onchange = () => {
          if (state === "prompt" || state === "denied") {
            setPermissions(false);
            getUserCoords();
          } else if (state === "granted") {
            getUserCoords();
          }
        };
      });
  };

  const getUserCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setPermissions(true);

      setCoords({
        latitude: latitude,
        longitude: longitude,
      });
    });
  };

  useEffect(() => {
    if (!permission) {
      getPermissionGeo();
    }
  }, [permission]);

  useEffect(() => {
    if (permission) {
      startLoadingWeather({
        latitude: coords!.latitude,
        longitude: coords!.longitude,
      });
    }
  }, [permission]);

  return (
    <div>
      <img
        className="w-96"
        src={
          weather != ""
            ? `../../src/assets/weather/${weather}.jpg`
            : "../../src/assets/weather/defaultWeather.jpg"
        }
        alt="weather-cover"
      />
    </div>
  );
};
