import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SavedNamesProvider } from "./context/SavedNamesContext.jsx";

import "./index.css"; // Ensure styles load

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SavedNamesProvider>
        <App />
      </SavedNamesProvider>
    </BrowserRouter>
  </React.StrictMode>
);