import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  closeConfirmationDialog,
  deleteNote,
} from "../../store/slices/noteSlice";
import { addErrorMsg } from "../../store/slices/msgSlice";

const ConfirmationDeleteDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { authtoken } = useAppSelector((state) => state.user);
  const { delConfirmationDialog, deleleNoteId } = useAppSelector(
    (state) => state.notes
  );
  const cancelDeleteDialog = () => {
    dispatch(closeConfirmationDialog());
  };

  const handleDeleteNote = () => {
    if (deleleNoteId) {
      dispatch(deleteNote({ authtoken, dispatch, id: deleleNoteId }));
      dispatch(closeConfirmationDialog());
    } else {
      dispatch(addErrorMsg(`Id is missing of note ${deleleNoteId}`));
    }
  };
  return (
    <>
      {delConfirmationDialog && (
        <div
          onClick={cancelDeleteDialog}
          className="fixed inset-0 bg-black/25 grid place-items-center h-dvh  z-30"
        >
          <dialog
            open={delConfirmationDialog}
            className="z-40 mx-auto my-4 p-4 w-sm rounded-xl space-y-4 dark:bg-gray-900"
          >
            <h3 className="text-2xl text-center mb-11 dark:text-white">
              Are You Sure
            </h3>

            <div className="grid grid-cols-[50%_50%] space-x-4">
              <button
                className="bg-red-500  hover:bg-red-600 dark:bg-red-600  dark:hover:bg-red-700 text-white rounded-md px-2 py-1 transition-colors duration-300"
                onClick={handleDeleteNote}
              >
                delete
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-md px-2 py-1 transition-colors duration-300"
                onClick={cancelDeleteDialog}
              >
                cancel
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default ConfirmationDeleteDialog;
