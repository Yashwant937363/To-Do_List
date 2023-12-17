import { useState } from 'react';
import './NoteWindow.css';
import { useDispatch, useSelector } from 'react-redux';
import { createNote, deleteNote, updateNote } from '../../../store/slices/notesSlice';

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
        if (newNote) {
            console.log('create new note ');
            let newNote = JSON.stringify({
                title, tag, body
            });
            dispatch(createNote({ authtoken, newNote, dispatch, setNoteOpen }));
        }
        else {
            console.log("update existing note")
            let id = note._id;
            let newNote = JSON.stringify({
                title, tag, body
            })
            dispatch(updateNote({ authtoken, newNote, dispatch, id ,setNoteOpen}));
        }
    }

    const handleDelete = () => {
        let id = note._id;
        dispatch(deleteNote({ authtoken, dispatch, id }));
        setNoteOpen(false);
    }
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
                    <option value="Default">Select a Tag</option>
                    <option value="Coffee Shop">Coffee Shop</option>
                    <option value="Evening Relaxation">Evening Relaxation</option>
                    <option value="General">General</option>
                    <option value="Home">Home</option>
                    <option value="Home Office">Home Office</option>
                    <option value="Idea">Idea</option>
                    <option value="Journal">Journal</option>
                    <option value="Library">Library</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Morning Routine">Morning Routine</option>
                    <option value="Office">Office</option>
                    <option value="Personal">Personal</option>
                    <option value="Project">Project</option>
                    <option value="Reminder">Reminder</option>
                    <option value="School">School</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Study">Study</option>
                    <option value="Task">Task</option>
                    <option value="Work">Work</option>
                </select>
                <textarea value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </form>
        </div>
    );
}