import React from "react";
import { useSavedNames } from "../context/SavedNamesContext";

export default function SavedNames() {
  const { savedNames, removeName } = useSavedNames();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Saved Characters</h1>
      {savedNames.length === 0 ? (
        <p>No saved names yet.</p>
      ) : (
        <ul>
          {savedNames.map((entry) => (
            <li key={entry.name} style={{ marginBottom: "1rem" }}>
              <strong>{entry.name}</strong>
              <br />
              <em>{entry.backstory?.substring(0, 80)}...</em>
              <br />
              <button onClick={() => removeName(entry.name)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}