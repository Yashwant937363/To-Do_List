import { Route, Routes, useNavigate } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Auth from "./components/Auth/Auth";
import { useAppSelector } from "./hooks/reduxHooks";
import { useEffect } from "react";
import NotificationContianer from "./components/NotificationBars/NotificationContianer";

function App() {
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.user.isLogin);
  useEffect(() => {
    if (!isLogin) navigate("/auth/login");
  }, [isLogin]);
  return (
    <>
      <NotificationContianer />
      <div className="">
        <Navbar title="Todo" />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
