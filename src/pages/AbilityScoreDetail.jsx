import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AbilityScoreDetail() {
  const { index } = useParams(); // e.g. 'cha'
  const [ability, setAbility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/2014/ability-scores/${index}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch ability score');
        return res.json();
      })
      .then(data => {
        setAbility(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [index]);

  if (loading) return <p>Loading ability score...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{ability.full_name} ({ability.name})</h2>
      {ability.desc.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <h3>Related Skills:</h3>
      <ul>
        {ability.skills.map(skill => (
          <li key={skill.index}>{skill.name}</li>
        ))}
      </ul>
    </div>
  );
}