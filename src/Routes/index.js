import React from "react";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "../Component/Home/Home";
import NoPage from "../Component/NoPage";

const RoutesPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPage;
