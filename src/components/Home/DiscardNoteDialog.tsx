import React, { type MouseEventHandler } from "react";
import type { FieldErrors } from "react-hook-form";
import { type NoteForm } from "../../types/NoteForm";

interface DiscardNoteDialogProps {
  discard: boolean;
  errors: FieldErrors<NoteForm>;
  discardNote: MouseEventHandler<HTMLButtonElement>;
  continueNote: MouseEventHandler<HTMLButtonElement>;
}

const DiscardNoteDialog: React.FC<DiscardNoteDialogProps> = ({
  discard,
  errors,
  continueNote,
  discardNote,
}) => {
  console.log(errors);
  return (
    <>
      {discard && (
        <div className=" fixed inset-0 bg-black opacity-25 z-30"></div>
      )}
      <dialog
        open={discard}
        className="z-40 mx-auto my-44 p-5 rounded-xl space-y-4 w-sm dark:bg-gray-900"
      >
        <h3 className="text-2xl text-center dark:text-white">
          Note Incomplete
        </h3>
        {errors.title && (
          <div className="text-red-500 text-center ">
            {errors.title.message}
          </div>
        )}
        {errors.body && (
          <div className="text-red-500 text-center ">{errors.body.message}</div>
        )}

        <div className="grid grid-cols-[50%_50%] space-x-2">
          <button
            className="bg-red-500  hover:bg-red-600 dark:bg-red-600  dark:hover:bg-red-700 text-white rounded-md px-2 py-1 transition-colors duration-300"
            onClick={discardNote}
          >
            discard
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md px-2 py-1 transition-colors duration-300"
            onClick={continueNote}
          >
            continue
          </button>
        </div>
      </dialog>
    </>
  );
};

export default DiscardNoteDialog;
