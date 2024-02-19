import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  weather: string;
}

const initialState: InitialState = {
  weather: "",
};

export const weatherSlice = createSlice({
  name: "weather",

  initialState,
  reducers: {
    onSetWeather: (state, {payload}) => {
      state.weather = payload;
    },
  },
});

export const { onSetWeather } = weatherSlice.actions;
