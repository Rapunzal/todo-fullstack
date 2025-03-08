import { useEffect, useState, useRef } from "react";
import "./App.css";
import { SignUp } from "./SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";

const BASE_URL = import.meta.env.VITE_API;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
