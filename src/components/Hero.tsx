/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { DispatchContext, StateContext } from '../App';
import './Hero.css';

interface ParamTypes{
  id: string
}

export default function Hero() {
  const history = useHistory();
  const { id } = useParams<ParamTypes>();
  const { heroes } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const hero = heroes.find((_hero) => String(_hero.id) === id);
  return (
    hero ? (
      <>
        <h2>
          {`${hero.name.toUpperCase()} Details`}
        </h2>
        <div>
          <span>id: </span>
          {hero.id}
        </div>
        <div>
          <span>name: </span>
          <input type="text" value={hero.name} onChange={(event) => { dispatch({ type: 'CHANGE_HERO_NAME', payload: { value: event.target.value, id } }); }} />
        </div>
        <button type="button" onClick={history.goBack}>go back</button>
      </>
    ) : null
  );
}
