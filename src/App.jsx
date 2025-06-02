import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import MyNavbar from "./components/MyNavbar";
import { Informacion } from "./pages/Informacion";

const App = () => {
  return (
    <BrowserRouter>
    <MyNavbar/>
      <Routes>
        <Route element={<Home />} index />
        <Route element={<Informacion />} path="info" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
