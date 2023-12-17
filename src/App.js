import Body from "./Components/Body/body";
import About from "./Components/About/About";
import Navbar from "./Components/Navbar/navbar";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsgBar from "./Components/MsgBars/ErrorMsgBar/ErrorMsgBar";
import SuccessMsgBar from "./Components/MsgBars/SuccessMsgBar/SuccessMsgBar";
import { useEffect, useRef } from "react";
import { setError, setSucess } from "./store/slices/userSlice";
import { setErrorMsg, setSucessMsg } from "./store/slices/notesSlice";
import LoadingBar from "react-top-loading-bar";

export default function App() {
   const dispatch = useDispatch();
   const errormsguser = useSelector((state) => state.user.errormsg);
   const successmsguser = useSelector((state) => state.user.successmsg);
   const successmsgnote = useSelector((state) => state.notes.successmsg);
   const errormsgnote = useSelector((state) => state.notes.errormsg);
   const notePending = useSelector((state) => state.notes.isPending);
   const noteRef = useRef(null);
   useEffect(() => {
      if(notePending){
         noteRef.current.continuousStart();
      }else{
         noteRef.current.complete();
      }
      // eslint-disable-next-line
   },[notePending]);
   useEffect(() => {
      if (successmsguser !== '') {
         setTimeout(() => {
            dispatch(setSucess(''));
         }, 3000);
      }
      if (errormsguser !== '') {
         setTimeout(() => {
            dispatch(setError(''));
         }, 5000);
      }
      if(successmsgnote !== ''){
         setTimeout(() => {
            dispatch(setSucessMsg(''));
         }, 3000);
      }
      if(errormsgnote !== ''){
         setTimeout(() => {
            dispatch(setErrorMsg(''));
         }, 5000);
      }
      // eslint-disable-next-line
   },[errormsguser,successmsguser,successmsgnote,errormsgnote]);
   return (
      <>
         {(successmsguser !== '') ? (<SuccessMsgBar msg={successmsguser} />) : null}
         {(errormsguser !== '') ? (<ErrorMsgBar msg={errormsguser} />) : null}
         {(successmsgnote !== '') ? (<SuccessMsgBar msg={successmsgnote} />) : null}
         {(errormsgnote !== '') ? (<ErrorMsgBar msg={errormsgnote} />) : null}
         <LoadingBar color='#f11946' ref={noteRef} />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Navbar title="To-Do" />}>
                  <Route index element={<Body />} />
                  <Route path="/about" element={<About />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </>
   );
}
