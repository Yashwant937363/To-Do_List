import React, { type MouseEventHandler } from "react";
import type Note from "../../types/note";
import { motion } from "motion/react";
import { Pen, Trash } from "lucide-react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { openConfirmationDialog, openNote } from "../../store/slices/noteSlice";

interface NoteCardProps {
  note: Note;
  index: number;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, index }) => {
  const getFormatedDate = (note: Note) => {
    let formatedDate = "";
    if (note.createdAt !== note.updatedAt) {
      formatedDate = "Ediated ";
    }
    if (note.updatedAt) {
      const date = new Date(note.updatedAt);
      formatedDate += date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    }
    return formatedDate;
  };

  const dispatch = useAppDispatch();
  const handleDelete: MouseEventHandler<HTMLOrSVGElement> = (event) => {
    event.stopPropagation();
    if (note.id) {
      dispatch(openConfirmationDialog(note.id));
    }
  };
  const handleOpenNote = () => {
    dispatch(openNote({ purpose: "show", id: note.id }));
  };
  const handleEditNote: MouseEventHandler<HTMLOrSVGElement> = (event) => {
    event.stopPropagation();
    dispatch(openNote({ purpose: "edit", id: note.id }));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "tween", duration: 0.3, delay: 0.08 * index }}
        className="mb-4 break-inside-avoid dark:bg-gray-800 p-4 space-y-2 rounded relative shadow group z-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleOpenNote}
          className="absolute top-0 left-0 size-full bg-gradient-to-b from-black/15 via-transparent to-black/15 dark:from-black/25  dark:to-black/25 z-10 rounded"
        >
          <div className="flex space-x-2 absolute group bottom-2 right-2">
            <Trash
              onClick={handleDelete}
              size={20}
              className="translate-y-1/2 opacity-75 hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            />
            <Pen
              className=" translate-y-1/2 opacity-75 hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              onClick={handleEditNote}
              size={20}
            />
          </div>
        </motion.div>

        <div className=" flex justify-between ">
          <h4 className="font-semibold">{note.title} </h4>
          <span className=" text-xs rounded-2xl font-light px-2 bg-black/10 h-1/2">
            {note.tag}
          </span>
        </div>

        <p>{note.body}</p>
        <div className="text-sm font-extralight text-right">
          {getFormatedDate(note)}
        </div>
      </motion.div>
    </>
  );
};

export default NoteCard;
