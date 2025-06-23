import type React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import NotesContainer from "./NotesContainer";
import { Plus } from "lucide-react";
import NoteDialog from "./NoteDialog";
import { openNote } from "../../store/slices/noteSlice";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { addErrorMsg } from "../../store/slices/msgSlice";
import { useEffect } from "react";
const Home: React.FC = () => {
  const { username, isLogin } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { openedNotePurpose } = useAppSelector((state) => state.notes);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate("/auth/login");
      dispatch(addErrorMsg("Please Login First"));
    }
  }, []);
  return (
    <div>
      {openedNotePurpose !== "" && <NoteDialog purpose={openedNotePurpose} />}
      <div className="m-10 flex justify-between">
        <h1 className="text-xl">Welcome {username}</h1>
        <motion.button
          transition={{ type: "tween", duration: 0.3 }}
          onClick={() => dispatch(openNote({ purpose: "new" }))}
          className="bg-primary hover:bg-primary/90  py-1 px-2 rounded-lg flex space-x-2  cursor-pointer"
        >
          create note
          <Plus className="w-[20px]" />
        </motion.button>
      </div>
      <NotesContainer />
    </div>
  );
};

export default Home;
