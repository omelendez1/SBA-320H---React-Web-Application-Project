import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ClassLore() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.dnd5eapi.co/api/classes')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch classes');
        return response.json();
      })
      .then((data) => {
        setClasses(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Class Lore</h1>
      <p>Explore the many classes of adventurers in the D&D world.</p>
      <ul>
        {classes.map((cls) => (
          <li key={cls.index}>
            <Link to={`/classes/${cls.index}`} style={{ color: '#3498db', textDecoration: 'none' }}>
              {cls.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassLore;