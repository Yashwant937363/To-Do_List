import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import noteReducer from "./slices/noteSlice";
import msgReducer from "./slices/msgSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: noteReducer,
    msg: msgReducer,
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
