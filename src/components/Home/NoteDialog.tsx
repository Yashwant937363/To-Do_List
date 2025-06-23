import React, {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  createNote,
  closeNote,
  updateNote,
} from "../../store/slices/noteSlice";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import DiscardNoteDialog from "./DiscardNoteDialog";
import type NoteForm from "../../types/NoteForm";

const tagOptions = [
  "General",
  "Home",
  "Idea",
  "Journal",
  "Library",
  "Meeting",
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

interface NoteDialogProps {
  purpose: "new" | "edit" | "show";
}

const NoteDialog: React.FC<NoteDialogProps> = ({ purpose }) => {
  const { isNoteOpen, notes, openedNoteID } = useAppSelector(
    (state) => state.notes
  );
  const { authtoken } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    trigger,
    getValues,
    setValue,
  } = useForm<NoteForm>({
    defaultValues: {
      title: "",
      body: "",
      tag: tagOptions[0],
    },
  });
  const body = watch("body");
  const [discard, setDiscard] = useState(false);

  const [date, setDate] = useState(new Date());

  const handleDiscardNote = () => {
    setDiscard(false);
    dispatch(closeNote());
  };

  const handleContinueNote = () => {
    setDiscard(false);
  };

  const onNoteSubmit: SubmitHandler<NoteForm> = (data) => {
    if (purpose === "new") {
      dispatch(
        createNote({
          authtoken,
          newNote: { body: data.body, title: data.title, tag: data.tag },
        })
      );
    }
    if (purpose === "edit") {
      let note = notes.find((note) => note.id === openedNoteID);
      if (note) {
        if (
          note.title !== data.title ||
          note.body !== data.body ||
          note.tag !== data.tag
        ) {
          dispatch(
            updateNote({
              authtoken,
              id: openedNoteID,
              newNote: { body: data.body, title: data.title, tag: data.tag },
            })
          );
        } else {
          dispatch(closeNote());
        }
      }
    }
  };

  const handleCloseNote: MouseEventHandler<HTMLDivElement> = () => {
    const [body, title] = watch(["body", "title"]);
    if (purpose !== "show") {
      if (title !== "" && body !== "") {
        const createNewNote = handleSubmit(onNoteSubmit);
        createNewNote();
        return;
      }
      if (title !== "" || body !== "") {
        trigger("title");
        trigger("body");
        setDiscard(true);
        return;
      }
    }
    dispatch(closeNote());
  };
  const getFormatedDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  useEffect(() => {
    if (purpose === "edit" || purpose === "show") {
      const note = notes.find((note) => note.id === openedNoteID);
      if (note) {
        if (note.updatedAt) setDate(new Date(note.updatedAt));
        setValue("title", note.title);
        setValue("body", note.body);
        setValue("tag", note.tag);
      }
    }
    if (purpose === "new") {
      reset();
    }
  }, [purpose]);
  useEffect(() => {
    if (!isNoteOpen) {
      reset();
    }
  }, [isNoteOpen]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lineHeight = 24; // px (default line height for text-base)
  const minRows = 3;
  const maxRows = 20;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      console.log("running", textarea.scrollHeight);
      textarea.style.height = "auto"; // Reset height
      const maxHeight = lineHeight * maxRows;
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = newHeight + "px";
      console.log(newHeight);
    }
  }, [body]);

  useEffect(() => {
    console.log("errors");
  }, [errors]);

  return (
    <>
      {isNoteOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-10 grid place-items-center"
          onClick={handleCloseNote}
        >
          <motion.dialog
            transition={{ duration: 0.2 }}
            open={isNoteOpen}
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, transform: "translateY(100px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            className=" mx-auto my-20 p-4 rounded-2xl shadow-lg z-20 dark:bg-gray-900 w-[90vw] sm:w-md md:w-2xl transition-all duration-300"
          >
            <div className="mb-7 space-x-4  grid grid-cols-4">
              <div className="flex flex-col justify-baseline col-span-3">
                <input
                  placeholder="Title"
                  {...register("title", {
                    required: "title is mandatory",
                    onBlur: () => trigger("title"),
                  })}
                  disabled={purpose === "show"}
                  className="text-lg focus:outline-none dark:text-white"
                />

                {errors.title && (
                  <div className="text-red-500 text-sm">
                    {errors.title.message}
                  </div>
                )}
              </div>
              {purpose === "show" ? (
                <div className="flex justify-end align-items-end">
                  <span className="bg-black/20 dark:text-white/80 font-light rounded-2xl h-2/3  text-sm inline px-2">
                    {getValues("tag")}
                  </span>
                </div>
              ) : (
                <select
                  {...register("tag")}
                  name="noteTags"
                  className="text focus:outline-none text-xs dark:text-white bg-black/20 rounded-2xl pr-2"
                >
                  {tagOptions.map((option) => (
                    <option
                      className="dark:bg-gray-800"
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <textarea
              rows={minRows}
              className=" w-full  resize-none focus:outline-none  dark:text-white "
              placeholder="Write Something"
              {...register("body", {
                required: "note cannot be empty",

                onBlur: () => trigger("body"),
              })}
              ref={(e) => {
                // connect both refs: react-hook-form and your custom ref
                register("body").ref(e);
                textareaRef.current = e;
              }}
              disabled={purpose === "show"}
            />
            {errors.body && (
              <div className="text-red-500 text-sm">{errors.body.message}</div>
            )}
            <div className="text-sm text-text/80 dark:text-white/80 text-right">
              {getFormatedDate(date)}
            </div>
          </motion.dialog>
        </div>
      )}

      <DiscardNoteDialog
        discard={discard}
        errors={errors}
        continueNote={handleContinueNote}
        discardNote={handleDiscardNote}
      />
    </>
  );
};

export default NoteDialog;
