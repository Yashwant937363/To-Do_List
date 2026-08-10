import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import axios from "axios";
import Cookies from "js-cookie";
import { getNotes } from "./noteSlice";
import { addErrorMsg } from "./msgSlice";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
// const SERVER_URL = "http://localhost:5000";
const constructApiUrl = (endpoint: string): string =>
  `${SERVER_URL}/api/auth/${endpoint}`;

interface SignupUserRequest {
  username: string;
  email: string;
  password: string;
  dispatch: AppDispatch;
}

export const signupUser = createAsyncThunk(
  "signupUser",
  async ({ username, email, password, dispatch }: SignupUserRequest) => {
    try {
      const response = await axios.post(constructApiUrl("register"), {
        username,
        email,
        password,
      });

      if (response.status == 201) {
        dispatch(getNotes(response.data.data.authtoken));
      }
      return {
        data: response.data.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return {
            error: error.response.data.error,
          };
        } else {
          return {
            error: "Network Error",
          };
        }
      } else {
        return {
          error: "Something Went Wrong",
        };
      }
    }
  },
);

interface LoginUserRequest {
  email: string;
  password: string;
  dispatch: AppDispatch;
}

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password, dispatch }: LoginUserRequest) => {
    try {
      const response = await axios.post(constructApiUrl("login"), {
        email,
        password,
      });
      if (response.status === 200) {
        dispatch(getNotes(response.data.data.authtoken));
      }
      return {
        data: response.data.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return {
            error: error.response.data.error,
          };
        } else {
          return {
            error: "Network Error",
          };
        }
      } else {
        return {
          error: "Something Went Wrong",
        };
      }
    }
  },
);

interface GetUserRequest {
  token: string;
  dispatch: AppDispatch;
}

export const getUser = createAsyncThunk(
  "getUser",
  async ({ token, dispatch }: GetUserRequest) => {
    try {
      const response = await axios.get(constructApiUrl(""), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        dispatch(getNotes(token));
      }
      return {
        data: response.data.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(addErrorMsg("Please Login First"));
        if (error.response) {
          return {
            error: error.response.data.error,
          };
        } else {
          return {
            error: "Network Error",
          };
        }
      } else {
        return {
          error: "Something Went Wrong",
        };
      }
    }
  },
);

interface userState {
  isLogin: boolean;
  isPending: boolean;
  authtoken: string;
  email: string;
  username: string;
}

const initialState: userState = {
  isLogin: false,
  isPending: false,
  authtoken: "",
  email: "",
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignUpDetails: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    setLogInDetails: (state, action) => {
      state.email = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authtoken = action.payload;
    },
    clear: (state) => {
      state.isLogin = false;
      state.isPending = false;
      state.authtoken = "";
      state.email = "";
      state.username = "";
    },
  },

  extraReducers: (builder) => {
    //Caae 1 : Login User
    builder.addCase(loginUser.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("data:", action.payload);
      if (action.payload.data) {
        state.isLogin = true;
        state.username = action.payload.data.username;
        state.authtoken = action.payload.data.authtoken;
        Cookies.set("authtoken", action.payload.data.authtoken, { expires: 7 });
      }
      state.isPending = false;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isPending = false;
    });
    //Case 2:SignUp User
    builder.addCase(signupUser.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.isLogin = true;
        state.authtoken = action.payload.data.authtoken;
        Cookies.set("authtoken", action.payload.data.authtoken, { expires: 7 });
      }
      state.isPending = false;
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.isPending = false;
    });
    // Case 3
    builder.addCase(getUser.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isPending = false;
      if (action.payload.data) {
        state.isLogin = true;
        state.username = action.payload.data.username;
        state.email = action.payload.data.email;
        state.authtoken = action.payload.data.authtoken;
      }
    });
    builder.addCase(getUser.rejected, (state) => {
      state.isPending = false;
    });
  },
});

export default userSlice.reducer;
export const { clear, setAuthToken, setLogInDetails, setSignUpDetails } =
  userSlice.actions;
