import { Dispatch } from "redux";
import { authAPI } from "common/api/todolists-api";
import { setIsLoggedIn } from "features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type AppInitialStateType = typeof initialState;
const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false,
};

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

export const setAppError = slice.actions.setAppError;
export const setAppStatus = slice.actions.setAppStatus;
export const setAppInitialized = slice.actions.setAppInitialized;

//thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }));
    } else {
    }
    dispatch(setAppInitialized({ isInitialized: true }));
  });
};

//type
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
