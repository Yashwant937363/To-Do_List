import Body from "./Components/body";
import About from "./Components/About";
import Navbar from "./Components/navbar";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
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
