import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const constructApiUrl = (endpoint) => `${SERVER_URL}/api/notes/${endpoint}`;

export const getNotes = createAsyncThunk('getNotes', async (authtoken) => {
    const response = await fetch(constructApiUrl(''), {
        method: 'GET',
        headers: {
            'auth-token': authtoken,
            'Accept': '*/*',
        }
    })
    try {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);

        }
        const data = await response.json();
        return {
            data: data,
            status: response.status
        };
    }
    catch (error) {
        console.error(`Error:`, error.message);
    }

});

export const createNote = createAsyncThunk('createNote', async ({ authtoken, newNote, dispatch, setNoteOpen }) => {
    const response = await fetch(constructApiUrl(''), {
        method: 'POST',
        headers: {
            'auth-token': authtoken,
            'Accept': '*/*',
            "Content-Type": "application/json",
        },
        body: newNote,
    })
    try {
        const data = await response.json();
        if (response.ok) {
            dispatch(getNotes(authtoken));
            setNoteOpen(false);
        }
        return {
            data: data,
            status: response.status
        };
    } catch (error) {
        console.error(`Error:`, error.message);
    }

});

export const updateNote = createAsyncThunk('updateNote', async ({ authtoken, newNote, dispatch, id, setNoteOpen }) => {
    const response = await fetch(constructApiUrl(id), {
        method: 'PUT',
        headers: {
            'auth-token': authtoken,
            'Accept': '*/*',
            "Content-Type": "application/json",
        },
        body: newNote,
    })
    try {
        const data = await response.json();
        if (response.ok) {
            setNoteOpen(false);
            dispatch(getNotes(authtoken));
        }
        return {
            data: data,
            status: response.status
        };
    } catch (error) {
        console.error(`Error:`, error.message);
    }

});

export const deleteNote = createAsyncThunk('deleteNote', async ({ authtoken, dispatch, id }) => {
    const response = await fetch(constructApiUrl(id), {
        method: 'DELETE',
        headers: {
            'auth-token': authtoken,
            'Accept': '*/*',
        },
    })
    try {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (response.ok) {
            dispatch(getNotes(authtoken));
        }
        return {
            data: data,
            status: response.status
        };
    } catch (error) {
        console.error(`Error:`, error.message);
    }

});

const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        isPending: false,
        noteRef: null,
        errormsg: '',
        successmsg: ''
    },
    reducers: {
        setErrorMsg: (state, action) => {
            state.errormsg = action.payload;
        },
        setSucessMsg: (state, action) => {
            state.successmsg = action.payload;
        },
        setNoteRef: (state, action) => {
            state.noteRef = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Case 1 : Fetch All Notes
        builder.addCase(getNotes.pending, (state, action) => {
            state.isPending = true;
        });
        builder.addCase(getNotes.fulfilled, (state, action) => {
            if (action.payload.status < 300 && action.payload.status >= 200) {
                state.notes = action.payload.data;
            }
            state.isPending = false;
        });
        builder.addCase(getNotes.rejected, (state, action) => {
            state.isPending = false;
            state.errormsg = 'Get Notes Failed';
        });

        //Case 2 : Create a New Note
        builder.addCase(createNote.pending, (state, action) => {
            state.isPending = false;
        });
        builder.addCase(createNote.fulfilled, (state, action) => {
            if (action.payload.status < 300 && action.payload.status >= 200) {
                state.successmsg = action.payload.data.msg;
            }
            else {
                state.errormsg = action.payload.data.errors[0]?.msg;
            }
            state.isPending = false;
        });
        builder.addCase(createNote.rejected, (state, action) => {
            state.isPending = false;
            state.errormsg = 'Create Note Failed! Please reload page';
        });

        //Case 3 : Update Note
        builder.addCase(updateNote.pending, (state, action) => {
            state.isPending = false;
        });
        builder.addCase(updateNote.fulfilled, (state, action) => {
            if (action.payload.status < 300 && action.payload.status >= 200) {
                state.successmsg = 'Note Updated Successfully! Please try again';
            }
            else {
                state.errormsg = action.payload.data?.errors[0].msg;
            }
            state.isPending = false;
        });
        builder.addCase(updateNote.rejected, (state, action) => {
            state.isPending = false;
            state.errormsg = 'Update Note Failed! Please try again';
        });

        //Case 4 : Delete Note
        builder.addCase(deleteNote.pending, (state, action) => {
            state.isPending = false;
        });
        builder.addCase(deleteNote.fulfilled, (state, action) => {
            let status = action.payload.status;
            if(status >= 200 && status < 300){
                state.successmsg = 'Note Deleted Successfully';
            }
            state.isPending = false;
        });
        builder.addCase(deleteNote.rejected, (state, action) => {
            state.isPending = false;
            state.errormsg = 'Delete Note Failed! Please try again';
        });
    }
})

export const { setErrorMsg, setSucessMsg, setNoteRef } = notesSlice.actions;
export default notesSlice.reducer;