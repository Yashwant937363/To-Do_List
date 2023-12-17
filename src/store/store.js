import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import notesSlice from './slices/notesSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    notes: notesSlice,
  },
})