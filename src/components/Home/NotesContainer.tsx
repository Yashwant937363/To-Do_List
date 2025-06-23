import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import type Note from "../../types/note";
import NoteCard from "./NoteCard";
import ConfirmationDeleteDialog from "./ConfirmationDeleteDialog";

const NotesContainer: React.FC = () => {
  const notes: Note[] = useAppSelector((state) => state.notes.notes);

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
      {notes.map((note, index) => (
        <NoteCard note={note} key={index} index={index} />
      ))}
      <ConfirmationDeleteDialog />
    </div>
  );
};

export default NotesContainer;
