import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";

// Pages
import Dashboard from "./components/pages/Dashboard";
import Completed from "./components/pages/Completed";
import Important from "./components/pages/Important";
import Settings from "./components/pages/Settings";
import Trash from "./components/pages/Trash";
import Upcoming from "./components/pages/Upcoming";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="completed" element={<Completed />} />
          <Route path="important" element={<Important />} />
          <Route path="settings" element={<Settings />} />
          <Route path="trash" element={<Trash />} />
          <Route path="upcoming" element={<Upcoming />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
