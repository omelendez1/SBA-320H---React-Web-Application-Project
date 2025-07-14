import React, { createContext, useState, useContext } from "react";

// Create the context
const SavedNamesContext = createContext();

// Context Provider Component
export function SavedNamesProvider({ children }) {
  const [savedNames, setSavedNames] = useState([]);

  const addName = (character) => {
    setSavedNames((prev) => {
      const exists = prev.some((c) => c.name === character.name);
      return exists ? prev : [...prev, character];
    });
  };

  const removeName = (nameToRemove) => {
    setSavedNames((prev) => prev.filter((c) => c.name !== nameToRemove));
  };

  return (
    <SavedNamesContext.Provider value={{ savedNames, addName, removeName }}>
      {children}
    </SavedNamesContext.Provider>
  );
}

// Custom Hook (exported inline)
export const useSavedNames = () => useContext(SavedNamesContext);