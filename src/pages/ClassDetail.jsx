import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const classImages = {
  barbarian: '/assets/images/barbarian.jpg',
  bard: '/assets/images/bard.jpg',
  cleric: '/assets/images/cleric.jpg',
  druid: '/assets/images/druid.jpg',
  fighter: '/assets/images/fighter.jpg',
  monk: '/assets/images/monk.jpg',
  paladin: '/assets/images/paladin.jpg',
  ranger: '/assets/images/ranger.jpg',
  rogue: '/assets/images/rogue.jpg',
  sorcerer: '/assets/images/sorcerer.jpg',
  warlock: '/assets/images/warlock.jpg',
  wizard: '/assets/images/wizard.jpg',
};

function ClassDetail() {
  const { index } = useParams();
  const [classData, setClassData] = useState(null);
  const [features, setFeatures] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const alignments = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
  ];
  const randomAlignment = alignments[Math.floor(Math.random() * alignments.length)];

  useEffect(() => {
    async function fetchClassData() {
      try {
        const [classRes, featuresRes, equipmentRes] = await Promise.all([
          fetch(`https://www.dnd5eapi.co/api/classes/${index}`),
          fetch(`https://www.dnd5eapi.co/api/classes/${index}/features`),
          fetch(`https://www.dnd5eapi.co/api/classes/${index}/starting-equipment`),
        ]);

        if (!classRes.ok || !featuresRes.ok || !equipmentRes.ok)
          throw new Error('Failed to fetch class details');

        const classData = await classRes.json();
        const featuresData = await featuresRes.json();
        const equipmentData = await equipmentRes.json();

        const topFeatures = featuresData.results.slice(0, 3);
        const featureDetails = await Promise.all(
          topFeatures.map(f =>
            fetch(`https://www.dnd5eapi.co${f.url}`).then(res => res.json())
          )
        );

        setClassData(classData);
        setFeatures(featureDetails);
        setEquipment(equipmentData.starting_equipment);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchClassData();
  }, [index]);

  if (loading) return <p>Loading class details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{classData.name}</h2>
      {classImages[index] && (
        <img
          src={classImages[index]}
          alt={classData.name}
          style={{ width: '300px', borderRadius: '8px', marginBottom: '1rem' }}
        />
      )}
      <p><strong>Alignment:</strong> {randomAlignment}</p>
      <p><strong>Hit Die:</strong> d{classData.hit_die}</p>
      <p><strong>Proficiencies:</strong></p>
      <ul>
        {classData.proficiencies.map((prof) => (
          <li key={prof.index}>{prof.name}</li>
        ))}
      </ul>
      <p><strong>Saving Throws:</strong></p>
      <ul>
        {classData.saving_throws.map((save) => (
          <li key={save.index}>{save.name}</li>
        ))}
      </ul>
      <p><strong>Notable Features:</strong></p>
      <ul>
        {features.map((feat) => (
          <li key={feat.index}>
            <strong>{feat.name}</strong><br />
            <em>{feat.desc?.[0]}</em>
          </li>
        ))}
      </ul>
      <p><strong>Starting Equipment:</strong></p>
      <ul>
        {equipment.map((item, idx) => (
          <li key={idx}>{item.equipment.name} (Qty: {item.quantity})</li>
        ))}
      </ul>
    </div>
  );
}

export default ClassDetail;
