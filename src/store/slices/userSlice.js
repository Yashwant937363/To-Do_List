import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNotes } from './notesSlice';
import Cookies from 'js-cookie';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const SERVER_URL = "http://localhost:5000";
const constructApiUrl = (endpoint) => `${SERVER_URL}/api/auth/${endpoint}`;

export const signupUser = createAsyncThunk('signupUser', async ({ username, email, password, dispatch }) => {
   const response = await fetch(constructApiUrl(''), {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': '*/*',  // Add the Accept header
      },
      body: JSON.stringify({
         username,
         email,
         password,
      }),
   });
   const data = await response.json();
   if (response.ok) {
      dispatch(getNotes(data.authtoken));
   }
   return {
      data: data,
      status: response.status,
   }
});

export const loginUser = createAsyncThunk('loginUser', async ({ email, password, dispatch }) => {
   const response = await fetch(constructApiUrl('login'), {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         email, password
      }),
   });
   const data = await response.json();
   if (response.ok) {
      dispatch(getNotes(data.authtoken));
   }
   return {
      data: data,
      status: response.status
   };

})

export const getUser = createAsyncThunk('getUser', async ({ token, dispatch }) => {
   const response = await fetch(constructApiUrl(''), {
      method: 'GET',
      headers: {
         'Accept': '*/*',
         'auth-token': token,
      },
   });
   const data = await response.json();
   if (response.ok) {
      dispatch(getNotes(token));
   }
   return {
      data: data,
      status: response.status
   };

})

const initialState = {
   isLogin: false,
   isPending: false,
   authtoken: null,
   email: null,
   username: null,
   errormsg: '',
   successmsg: ''
}

export const userSlice = createSlice({
   name: 'user',
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
      setSucess: (state, action) => {
         state.successmsg = action.payload;
      },
      setError: (state, action) => {
         state.errormsg = action.payload;
      },
      clear: (state) => {
         state.isLogin = false;
         state.authtoken = null;
         state.email = null;
         state.username = null;
         state.successmsg = '';
         state.errormsg = '';
      },
   },
   extraReducers: (builder) => {
      //Caae 1 : Login User
      builder.addCase(loginUser.pending, (state, action) => {
         state.isPending = true;
      });
      builder.addCase(loginUser.fulfilled, (state, action) => {
         if (action.payload.status < 300 && action.payload.status >= 200) {
            state.isLogin = true;
            state.username = action.payload.data.username;
            state.authtoken = action.payload.data.authtoken;
            Cookies.set('authtoken', action.payload.data.authtoken, { expires: 7 });
            state.successmsg = action.payload.data.msg;
         } else if (action.payload.status === 401) {
            state.errormsg = action.payload.data.error;
         } else {
            state.errormsg = action.payload.data.error[0]?.msg;
         }
         state.isPending = false;
      })
      builder.addCase(loginUser.rejected, (state, action) => {
         state.isPending = false;
         state.errormsg = "Login failed. Please check your credentials and try again.";
      });

      //Case 2 : SignUp User
      builder.addCase(signupUser.pending, (state, action) => {
         state.isPending = true;
      });
      builder.addCase(signupUser.fulfilled, (state, action) => {
         if (action.payload.status < 300 && action.payload.status >= 200) {
            state.isLogin = true;
            state.authtoken = action.payload.data.authtoken;
            state.successmsg = "Sign Up Successful";
            Cookies.set('authtoken', action.payload.data.authtoken, { expires: 7 });
         }
         else {
            state.errormsg = action.payload.data.errors[0]?.msg;
         }
         state.isPending = false;
      })
      builder.addCase(signupUser.rejected, (state, action) => {
         state.isPending = false;
         state.errormsg = "Sign Up failed. Please try again.";
      });

      //Case 3 : Get User
      builder.addCase(getUser.pending, (state, action) => {
         state.isPending = true;
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
         state.isPending = false;
         state.isLogin = true;
         state.username = action.payload.data.username;
         state.email = action.payload.data.email;
         state.successmsg = 'Login Successful';
      })
      builder.addCase(getUser.rejected, (state, action) => {
         state.isPending = false;
         state.errormsg = "Failed to fetch user data. Please try again.";
      });
   }
})

export const { clear, setLogInDetails, setSucess, setError, setAuthToken, setSignUpDetails } = userSlice.actions;
export default userSlice.reducer;