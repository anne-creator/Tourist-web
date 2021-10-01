import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null; // jwt token
}

const initialState: UserState = {
  loading: true,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (parameters:{
      email:string,
      password: string,

  }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/auth/login`,{
        email: parameters.email,
        password: parameters.password
      }
    );
    return data.token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
