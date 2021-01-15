/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DispatchContext, StateContext } from '../App';
import './HeroesList.css';

export default function HeroesList() {
  const { heroes, selectedHeroId } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const hero = heroes.find((_hero) => _hero.id === selectedHeroId);
  const setSelectedHero = (id: number) => {
    dispatch({ type: 'CHANGE_HERO', payload: id });
  };

  return (
    <>
      <h2>My Heroes</h2>
      <ul className="heroes">
        {heroes.map((h) => (
          <li key={h.id} onClick={() => setSelectedHero(h.id)}>
            <span className="badge">{h.id}</span>
            {' '}
            {h.name}
          </li>
        ))}
      </ul>
      {hero && (
      <div>
        <h2>
          {hero.name.toUpperCase()}
          {' '}
          is my Hero
        </h2>
        <Link to={`/heroes/${hero.id}`}>View Details</Link>
      </div>
      )}
    </>
  );
}
