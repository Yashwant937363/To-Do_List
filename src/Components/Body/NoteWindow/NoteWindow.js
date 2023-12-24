import { useState } from 'react';
import './NoteWindow.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, deleteNote, setErrorMsg, updateNote } from '../../../store/slices/notesSlice';

export default function NoteWindow(props) {
    const dispatch = useDispatch();
    const { setNoteOpen, note } = props;
    const authtoken = useSelector((state) => state.user.authtoken);
    const [title, setTitie] = useState(note.title);
    const [tag, setTag] = useState(note.tag);
    const [body, setBody] = useState(note.body);
    const newNote = note.newNote;
    const handleChangeTag = (event) => {
        setTag(event.target.value);
    }

    const handleSave = () => {
        // Validation checks
        if (!title.trim()) {
            dispatch(setErrorMsg('Title cannot be empty'));
            return;
        }

        if (body.length < 5) {
            dispatch(setErrorMsg('Textarea must have at least 5 letters'));
            return;
        }

        if (tag === 'Default') {
            dispatch(setErrorMsg('Please select a tag'));
            return;
        }

        if (newNote) {
            let newNote = JSON.stringify({
                title, tag, body
            });
            dispatch(createNote({ authtoken, newNote, dispatch, setNoteOpen }));
        }
        else {
            let id = note._id;
            let newNote = JSON.stringify({
                title, tag, body
            })
            dispatch(updateNote({ authtoken, newNote, dispatch, id, setNoteOpen }));
        }
    }

    const handleDelete = () => {
        let id = note._id;
        dispatch(deleteNote({ authtoken, dispatch, id }));
        setNoteOpen(false);
    }
    const tagOptions = [
        "Select a Tag",
        "Coffee Shop",
        "Evening Relaxation",
        "General",
        "Home",
        "Home Office",
        "Idea",
        "Journal",
        "Library",
        "Meeting",
        "Morning Routine",
        "Office",
        "Personal",
        "Project",
        "Reminder",
        "School",
        "Shopping",
        "Study",
        "Task",
        "Work",
    ];

    return (
        <div className='window'>
            <div className='windowheader'>
                <button className='btn backbtn' onClick={() => setNoteOpen(false)}><i className="bi bi-arrow-left"></i></button>
                <span className='deletesave'>
                    <button className='btn deletebtn' onClick={handleDelete}>Delete <i className="bi bi-trash-fill"></i></button>
                    <button className='btn savebtn' onClick={handleSave}>Save <i className="bi bi-floppy"></i></button>
                </span>
            </div>
            <form className='noteform'>
                <input type='text' value={title} onChange={(e) => setTitie(e.target.value)} placeholder='Title'></input>
                <select id="noteTags" value={tag} onChange={handleChangeTag} name="noteTags">
                    {tagOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </form>
        </div>
    );
}