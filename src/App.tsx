import React, { useState } from 'react';
import { BrowserRouter ,Switch, Route, NavLink} from 'react-router-dom';
import logo from './logo.svg';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { Task } from './types';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const tasksProps = { tasks , setTasks  }
  
  return (
    <BrowserRouter>
    <nav>
      <NavLink exact to="/" activeStyle={{fontWeight: 'bold'}}> 
      List 
      </NavLink>{' '}
      - { ' ' }
      <NavLink to="/focus" activeStyle={{fontWeight: 'bold'}}> 
      Focus 
      </NavLink>
    </nav>
    <Switch>
      <Route exact path="/"  >
        <ListScreen {...tasksProps}></ListScreen>
      </Route>
      <Route path="/focus" >
         <FocusScreen {...tasksProps}></FocusScreen>
      </Route>
    </Switch>
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
