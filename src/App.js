import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./Landing";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Meeting from "./meeting";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/meeting" element={<Meeting />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;