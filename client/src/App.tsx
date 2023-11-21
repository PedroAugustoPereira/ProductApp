import "./styles/global.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Form from "./pages/Form";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/form/:id" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
