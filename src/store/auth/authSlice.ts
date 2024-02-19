import { createSlice } from "@reduxjs/toolkit";

interface AuthUser {
  id: number;
  user_id: number;
  user: string;
}

type AuthStatus = "checking" | "authorized" | "unauthorized";

interface InitialState {
  status: AuthStatus;
  user: AuthUser;
}

const initialState: InitialState = {
  status: "checking",
  user: {
    id: 0,
    user_id: 0,
    user: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = initialState.status;
      state.user = initialState.user;
    },

    onLogin: (state, { payload }) => {
      (state.status = "authorized"), (state.user = payload);
    },

    onLogout: (state) => {
      state.status = "unauthorized",
      state.user = initialState.user
    }

  },
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;
