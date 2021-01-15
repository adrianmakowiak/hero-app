import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../App';
import './Dashboard.css';

export default function Dashboard() {
  const { heroes } = useContext(StateContext);
  return (
    <>
      <h3>Top Heroes</h3>
      <div className="grid grid-pad">
        {heroes.slice(0, 4).map((_hero) => (
          <Link key={_hero.id} to={`/heroes/${_hero.id}`} className="col-1-4">
            <div className="module hero">
              <h4>{_hero.name}</h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
