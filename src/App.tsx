/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import './App.css';
import Dashboard from './components/Dashboard';
import Hero from './components/Hero';
import HeroesList from './components/HeroesList';
import { HEROES } from './mocks';
import { IHero } from './models';

const initState: InitState = {
  heroes: [],
  selectedHeroId: null,
};

const delay = (millis: number) => new Promise<void>((resolve, reject) => {
  setTimeout((_) => resolve(), millis);
});

export const StateContext = React.createContext<InitState>(initState);
export const DispatchContext = React.createContext<React.Dispatch<IAction>>(() => {});

type InitState = {
  heroes: IHero[];
  selectedHeroId: number | null;
}

type IAction = {
  type: string;
  payload?: any;
}

const heroesReducer = (state: InitState, action: IAction): InitState => {
  switch (action.type) {
    case 'SET_HEROES':
      return {
        ...state,
        heroes: action.payload,
      };
    case 'CHANGE_HERO':
      return {
        ...state,
        selectedHeroId: action.payload,
      };
    case 'CHANGE_HERO_NAME':
      const heroes = state.heroes.map((hero) => {
        if (hero.id !== +action.payload.id) {
          return hero;
        }

        return {
          ...hero,
          name: action.payload.value,
        };
      });
      return {
        ...state,
        heroes,
      };
    default:
      throw new Error(`Action not recognized ${action}`);
  }
};

function App() {
  const [state, dispatch] = useReducer(heroesReducer, initState);
  useEffect(() => {
    async function fetchHeroes() {
      try {
        const heroes = await (await fetch('http://localhost:3001/heroes')).json();
        await delay(500); // FAKE DELAY
        dispatch({ type: 'SET_HEROES', payload: heroes });
      } catch (e) {
        console.error('Something wrong ...');
      }
    }
    fetchHeroes();
  }, []);
  const title = 'Tour of Heroes';
  return (
    <Router>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/heroes">Heroes</Link>
          </nav>
          <h1>{title}</h1>
          {state.heroes.length ? (
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/heroes">
                <HeroesList />
              </Route>
              <Route exact path="/heroes/:id">
                <Hero />
              </Route>
            </Switch>
          ) : (
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Router>

  );
}

export default App;
