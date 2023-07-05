import { AppDispatch, AppRootStateType } from "app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null;
}>();

// 1 параметр, то что санка возвращает, 2 параметр то что санка принимает(два этих параметра прописываются в самой санке)
// 3 параметр - типизация ошибки rejectWithValue

//withTypes обертка которая третьим параметром добавляет нужный нам тип
