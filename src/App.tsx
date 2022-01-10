import { shuffle } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import logo from './logo.svg';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { Task } from './types';


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(undefined);

  const updateTaskCompletion = (taskId: string, isComplete: boolean) => {
    setTasks((tasks => tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isComplete }
      } else {
        return task;
      }
    })));
  }

  const shuffleFocusedTask = () => {
    setFocusedTaskId(
      shuffle(tasks.filter(task => !task.isComplete))[0]!.id
    );
  }

  //   const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key == "Enter" && newTaskLabel != '') {
  //         setTasks(tasks => 
  //         [...tasks, 
  //         { id: nanoid(), label: newTaskLabel, isComplete: false }
  //         ])
  //         setNewTaskLabel('');
  //     }
  // }


  const addTask = (task: Pick<Task, 'label'>) => {
    const id = nanoid();
    setTasks(tasks =>
      [...tasks,
      { id, label: task.label, isComplete: false }
      ]);
    if (!focusedTaskId) setFocusedTaskId(id);
  }

  const focusedTask = tasks.find((task) => task.id === focusedTaskId);
  const tasksApi = {
    addTask,
    focusedTask,
    tasks,
    setTasks,
    shuffleFocusedTask,
    updateTaskCompletion
  }

  return (
    <BrowserRouter>
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
          <ListScreen {...tasksApi}></ListScreen>
        </Route>
        <Route path="/focus" >
          <FocusScreen {...tasksApi}></FocusScreen>
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
