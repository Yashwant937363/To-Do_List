import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createNote, deleteNote, getNotes, updateNote } from "./noteSlice";
import { getUser, loginUser, signupUser } from "./userSlice";

interface msgState {
  errormsg: string[];
  successmsg: string[];
}

const initialState: msgState = {
  errormsg: [],
  successmsg: [],
};

const msgSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addErrorMsg: (state, action: PayloadAction<string>) => {
      state.errormsg = [...state.errormsg, action.payload];
      const errorMessages = state.errormsg;
      setTimeout(() => (state.errormsg = errorMessages), 5000);
    },
    addSuccessMsg: (state, action: PayloadAction<string>) => {
      state.successmsg = [...state.successmsg, action.payload];
      const successMessages = state.successmsg;
      setTimeout(() => (state.successmsg = successMessages), 3000);
    },
    removeErrorMsg: (state, action: PayloadAction<number>) => {
      state.errormsg = state.errormsg.filter(
        (_, index) => index !== action.payload
      );
    },
    removeSuccessMsg: (state, action: PayloadAction<number>) => {
      state.successmsg = state.successmsg.filter(
        (_, index) => index !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    //userSlice
    //Caae 1 : Login User

    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.errormsg = [...state.errormsg, action.payload.error];
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("login failed", action.payload);
      state.errormsg = [
        ...state.errormsg,
        "Login failed. Please check your credentials and try again.",
      ];
    });

    //Case 2:SignUp User
    builder.addCase(signupUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.errormsg = [...state.errormsg, action.payload.error];
      }
    });
    builder.addCase(signupUser.rejected, (state) => {
      state.errormsg = [...state.errormsg, "Sign Up failed. Please try again."];
    });

    // Case 3
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.errormsg = [...state.errormsg, action.payload.error];
      }
    });
    builder.addCase(getUser.rejected, (state) => {
      state.errormsg = [
        ...state.errormsg,
        "Failed to fetch user data. Please try again.",
      ];
    });

    //noteSlice
    builder.addCase(getNotes.rejected, (state) => {
      state.errormsg = [...state.errormsg, "Get Notes Failed"];
    });

    //Case 2 : Create a New Note
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.successmsg = [...state.successmsg, action.payload.data.msg];
    });
    builder.addCase(createNote.rejected, (state) => {
      state.errormsg = [...state.errormsg, "Create Note Failed!"];
    });

    //Case 3 : Update Note
    builder.addCase(updateNote.fulfilled, (state) => {
      state.successmsg = [...state.successmsg, "Note Updated Successfully!"];
      //  state.errormsg = action.payload.data?.errors[0].msg;
    });
    builder.addCase(updateNote.rejected, (state) => {
      state.errormsg = [
        ...state.errormsg,
        "Update Note Failed! Please try again",
      ];
    });

    //Case 4 : Delete Note
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.successmsg = [...state.successmsg, "Note Deleted Successfully"];
    });
    builder.addCase(deleteNote.rejected, (state) => {
      state.errormsg = [
        ...state.errormsg,
        "Delete Note Failed! Please try again",
      ];
    });
  },
});

export default msgSlice.reducer;
export const { addErrorMsg, addSuccessMsg, removeErrorMsg, removeSuccessMsg } =
  msgSlice.actions;
