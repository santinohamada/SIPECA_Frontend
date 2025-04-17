import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";
import MyNavbar from "./components/MyNavbar";

const App = () => {
  return (
    <BrowserRouter>
    <MyNavbar/>
      <Routes>
        <Route element={<Home />} index />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
