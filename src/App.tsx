import { shuffle } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState }  from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import TaskContext from './contexts/task-store';
import useLocalStorage from './hooks/use-local-storage';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { Task } from './types';


function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks',[]);

  return (
    <BrowserRouter>
    <TaskContext.Provider value={[tasks, setTasks]}>
      <nav>
        <NavLink exact to="/" activeStyle={{ fontWeight: 'bold' }}>
          List
        </NavLink>{' '}
        - {' '}
        <NavLink to="/focus" activeStyle={{ fontWeight: 'bold' }}>
          Focus
        </NavLink>
      </nav>
      <Switch>
        <Route exact path="/"  >
          <ListScreen ></ListScreen>
        </Route>
        <Route path="/focus" >
          <FocusScreen ></FocusScreen>
        </Route>
      </Switch>
      </TaskContext.Provider>
    </BrowserRouter>
  );
}

function ListView() {
  return <h2>List View</h2>;
}


function FocusView() {
  return <h2>Focus View</h2>;
}

export default App;
