import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import axios from "axios";
import type Note from "../../types/note";
import { type Purpose } from "../../types/NoteDialogPurpose";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const constructApiUrl = (endpoint: string): string =>
  `${SERVER_URL}/api/notes/${endpoint}`;

export const getNotes = createAsyncThunk(
  "getNotes",
  async (authtoken: string) => {
    const response = await axios.get(constructApiUrl("all"), {
      headers: { Authorization: `Bearer ${authtoken}` },
    });

    return {
      data: response.data.data,
    };
  },
);

interface createNoteRequest {
  authtoken: string;
  newNote: Note;
}

export const createNote = createAsyncThunk(
  "createNote",
  async ({ authtoken, newNote }: createNoteRequest) => {
    const response = await axios.post(constructApiUrl(""), newNote, {
      headers: { Authorization: `Bearer ${authtoken}` },
    });
    return {
      data: response.data,
    };
  },
);

interface updateNoteRequest {
  authtoken: string;
  newNote: Note;

  id: string;
}

export const updateNote = createAsyncThunk(
  "updateNote",
  async ({ authtoken, newNote, id }: updateNoteRequest) => {
    const response = await axios.patch(constructApiUrl(id), newNote, {
      headers: { Authorization: `Bearer ${authtoken}` },
    });

    return {
      data: response.data.data,
      status: response.status,
    };
  },
);

interface deleteNoteRequest {
  authtoken: string;
  dispatch: AppDispatch;
  id: string;
}

export const deleteNote = createAsyncThunk(
  "deleteNote",
  async ({ authtoken, id }: deleteNoteRequest) => {
    const response = await axios.delete(constructApiUrl(id), {
      headers: { Authorization: `Bearer ${authtoken}` },
    });

    return {
      data: response.data.data,
      status: response.status === 200,
    };
  },
);

interface noteState {
  notes: Note[];
  isPending: boolean;
  isNoteOpen: boolean;
  deleleNoteId: string;
  delConfirmationDialog: boolean;
  openedNoteID: string;

  openedNotePurpose: Purpose | "";
}

const initialState: noteState = {
  notes: [],
  isPending: false,
  isNoteOpen: false,
  deleleNoteId: "",
  delConfirmationDialog: false,

  openedNoteID: "",

  openedNotePurpose: "",
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    openNote: (
      state,
      action: PayloadAction<{
        purpose: Purpose;
        id?: string;
      }>,
    ) => {
      const { purpose, id } = action.payload;
      state.isNoteOpen = true;
      state.openedNotePurpose = purpose;
      if (purpose !== "new" && id) {
        state.openedNoteID = id;
      }
    },
    closeNote: (state) => {
      state.isNoteOpen = false;
      state.openedNotePurpose = "";
      state.openedNoteID = "";
    },
    openConfirmationDialog: (state, action: PayloadAction<string>) => {
      state.delConfirmationDialog = true;
      state.deleleNoteId = action.payload;
    },
    closeConfirmationDialog: (state) => {
      state.delConfirmationDialog = false;
    },
    setDeleteNoteID: (state, action) => {
      state.deleleNoteId = action.payload;
    },
    setNoteOpenID: (state, action) => {
      state.openedNoteID = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Case 1 : Fetch All Notes
    builder.addCase(getNotes.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload.data;
      state.isPending = false;
    });
    builder.addCase(getNotes.rejected, (state) => {
      state.isPending = false;
    });

    //Case 2 : Create a New Note
    builder.addCase(createNote.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.isPending = false;
      state.isNoteOpen = false;
      state.notes = [...state.notes, action.payload.data.note];
    });
    builder.addCase(createNote.rejected, (state) => {
      state.isPending = false;
    });

    //Case 3 : Update Note
    builder.addCase(updateNote.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      const updatedNote: Note = action.payload.data.note;
      const nonUpdatedNotes = state.notes.filter(
        (note) => note.id !== updatedNote.id,
      );
      state.notes = [...nonUpdatedNotes, updatedNote];
      state.isPending = false;
      state.isNoteOpen = false;
      state.openedNotePurpose = "";
      state.openedNoteID = "";
    });
    builder.addCase(updateNote.rejected, (state) => {
      state.isPending = false;
    });

    //Case 4 : Delete Note
    builder.addCase(deleteNote.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      let notes = state.notes;
      let remainingNotes = notes.filter(
        (note) => note.id !== state.deleleNoteId,
      );
      state.notes = remainingNotes;
      state.deleleNoteId = "";
      state.delConfirmationDialog = false;
      state.isPending = false;
    });
    builder.addCase(deleteNote.rejected, (state) => {
      state.isPending = false;
    });
  },
});

export default noteSlice.reducer;
export const {
  openNote,
  closeNote,
  setDeleteNoteID,
  closeConfirmationDialog,
  openConfirmationDialog,
  setNoteOpenID,
} = noteSlice.actions;
