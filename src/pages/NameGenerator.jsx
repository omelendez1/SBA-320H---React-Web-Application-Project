import React, { useState } from "react";

function NameGenerator() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // A small pool of fantasy first names to mix with classes
  const fantasyFirstNames = [
    'Elanwe', 'Bromir', 'Lyra', 'Thorin', 'Aria', 'Fenric', 'Mira', 'Garrick', 'Liora', 'Doran', 'Elenion', 'Lirael', 'Thalindra', 'Aerendyl', 'Caelion', 'Nymeria', 'Silvarien', 'Faeril', 'Loriel', 'Velasara', 'Brokarn', 'Durgrim', 'Korgan', 'Thrainor', 'Morgran', 'Beldrak', 'Vorrik', 'Gimrida', 'Durnic', 'Torvald', 'Malrion', 'Zephyra', 'Althamir', 'Solyndra', 'Vaelric', 'Orren', 'Zarion', 'Enthera', 'Kelvinar', 'Yllindra', 'Kaelen', 'Sareth', 'Dravok', 'Nyxil', 'Zareth', 'Morwen', 'Veskyr', 'Ravyn', 'Xarnath', 'Lilithra', 'Tarnis', 'Elarion', 'Myrren', 'Thalor', 'Rowyn', 'Sylthas', 'Aurieth', 'Brannoc', 'Fenwyn', 'Kaeriel'
  ];

  const fetchNameAndBackstory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://www.dnd5eapi.co/api/classes");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const randomClass = data.results[Math.floor(Math.random() * data.results.length)];
      const randomName = fantasyFirstNames[Math.floor(Math.random() * fantasyFirstNames.length)];
      const name = `${randomName} the ${randomClass.name}`;
      const backstory = `Once a humble scribe, ${name} took up the path of the ${randomClass.name} to avenge their fallen kin.`;
      setCharacter({ name, backstory });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Fantasy Name & Backstory Generator</h1>
      <button onClick={fetchNameAndBackstory} disabled={loading}>
        {loading ? "Generating..." : "Generate Name"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {character && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{character.name}</h2>
          <p>{character.backstory}</p>
        </div>
      )}
    </div>
  );
}

export default NameGenerator;