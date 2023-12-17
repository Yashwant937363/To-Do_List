import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './body.css';
import Login from "../Login/Login";
import NoteWindow from "./NoteWindow/NoteWindow";
import ToDoList from "./ToDoList/ToDoList";

export default function Body() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const username = useSelector((state) => state.user.username);
  const notes = useSelector((state) => state.notes.notes);
  const [noteOpen, setNoteOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState({});

  const handleCreateNote = () => {
    let newNote = {
      title: '',
      tag: '',
      body: '',
      newNote: true,
    };
    setOpenedNote(newNote);
    setNoteOpen(true);
  }
  const handleNoteOpen = (index) => {
    let note = { ...notes[index], newNote: false }
    setOpenedNote(note);
    setNoteOpen(true);
  }
  if (!isLogin) {
    return <Login />
  };

  return (
    <section className="">
      <style>
        {`
            body{
              overflow :${noteOpen ? 'hidden' : 'scroll'} ;
            }
        `}
      </style>
      <div className="header">
        <h1>Welcome {username}</h1>
        <button className="btn" onClick={handleCreateNote}>Create Note</button>
      </div>
      <ToDoList handleNoteOpen={handleNoteOpen} />
      {
        (noteOpen) ?
          (
            <NoteWindow setNoteOpen={setNoteOpen} note={openedNote} />
          )
          : null
      }
    </section>
  );
}