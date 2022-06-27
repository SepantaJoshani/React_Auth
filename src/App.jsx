import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Layout,
  LinkPage,
  Login,
  Lounge,
  Admin,
  Editor,
  Home,
  Missing,
  Register,
  RequireAuth,
  Unauthorized,
} from "./components";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* 404 */}

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
