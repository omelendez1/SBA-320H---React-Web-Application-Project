import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import Home from './pages/Home.jsx';
import NameGenerator from './pages/NameGenerator.jsx';
import SavedNames from './pages/SavedNames.jsx';
import ClassLore from './pages/ClassLore.jsx';
import RaceList from './pages/RaceList.jsx';
import ClassDetail from './pages/ClassDetail.jsx';
import AbilityScoreDetail from './pages/AbilityScoreDetail.jsx';

export default function App() {
  return (
    <>
      <nav style={{ padding: '1rem', background: '#2c2f33', color: 'white' }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            marginRight: '1rem',
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none'
          })}
        >
          Home
        </NavLink>
        <NavLink
          to="/generator"
          style={({ isActive }) => ({
            marginRight: '1rem',
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none'
          })}
        >
          Name Generator
        </NavLink>
        <NavLink
          to="/lore"
          style={({ isActive }) => ({
            marginRight: '1rem',
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none'
          })}
        >
          Class Lore
        </NavLink>
        <NavLink
          to="/races"
          style={({ isActive }) => ({
            marginRight: '1rem',
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none'
          })}
        >
          Races
        </NavLink>
        <NavLink
          to="/saved"
          style={({ isActive }) => ({
            color: 'white',
            textDecoration: isActive ? 'underline' : 'none'
          })}
        >
          Saved Names
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<NameGenerator />} />
        <Route path="/lore" element={<ClassLore />} />
        <Route path="/races" element={<RaceList />} />
        <Route path="/saved" element={<SavedNames />} />
        <Route path="/classes/:index" element={<ClassDetail />} />
        <Route path="/ability-scores/:index" element={<AbilityScoreDetail />} />
        <Route path="*" element={<div style={{ padding: '2rem' }}>404 Not Found</div>} />
      </Routes>
    </>
  );
}