import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice, repoInfoSlice, authSlice, projectSlice } from ".";

export const Store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    weather: weatherSlice.reducer,
    repoInfo: repoInfoSlice.reducer,
    project: projectSlice.reducer
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
