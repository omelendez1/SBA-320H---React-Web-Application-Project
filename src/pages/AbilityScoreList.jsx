import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AbilityScoreList() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/2014/ability-scores')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch ability scores');
        return res.json();
      })
      .then(data => {
        setScores(data.results);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading ability scores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ability Scores</h1>
      <ul>
        {scores.map(score => (
          <li key={score.index}>
            <Link to={`/ability-scores/${score.index}`}>{score.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
