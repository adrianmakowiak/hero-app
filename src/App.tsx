/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './App.css';
import Dashboard from './components/Dashboard';
import Hero from './components/Hero';
import HeroesList from './components/HeroesList';
import { HEROES } from './mocks';
import { IHero } from './models';

const initState: InitState = {
  heroes: HEROES,
  selectedHeroId: null,
};

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
        </StateContext.Provider>
      </DispatchContext.Provider>
    </Router>

  );
}

export default App;
