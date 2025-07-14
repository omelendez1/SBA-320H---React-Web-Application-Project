import React, { useState, useEffect } from 'react';

function RaceList() {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/races')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch races');
        return response.json();
      })
      .then((data) => {
        setRaces(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading races...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Playable Races</h2>
      <ul>
        {races.map((race) => (
          <li key={race.index}>{race.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RaceList;
