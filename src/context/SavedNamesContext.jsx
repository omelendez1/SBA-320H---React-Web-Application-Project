import React, { createContext, useState, useContext } from "react";

// Create the context
const SavedNamesContext = createContext();

// Context Provider Component
export function SavedNamesProvider({ children }) {
  const [savedNames, setSavedNames] = useState([]);

  const addName = (name) => {
    setSavedNames((prev) => [...prev, name]);
  };

  const removeName = (name) => {
    setSavedNames((prev) => prev.filter((n) => n !== name));
  };

  return (
    <SavedNamesContext.Provider value={{ savedNames, addName, removeName }}>
      {children}
    </SavedNamesContext.Provider>
  );
}

// Custom Hook (declared and exported inline)
const useSavedNames = () => useContext(SavedNamesContext);
export { useSavedNames };