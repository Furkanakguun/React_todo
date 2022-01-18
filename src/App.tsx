import { shuffle } from 'lodash';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import TaskContext from './contexts/task-store';
import useLocalStorage from './hooks/use-local-storage';
import FocusScreen from './screens/FocusScreen';
import ListScreen from './screens/ListScreen';
import { colors, GlobalStyle } from './styles';
import { Task } from './types';

const Layout = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;min-height:100vh;
    padding: 35px;
`;

const Nav = styled.nav`
  display:flex;
  margin-bottom: 45px;
`;

const TabButton = styled(NavLink)` 
    background: black;
    color: #fff;
    display:flex;
    justify-content: center;
    align-items:center;
    text-decoration:none;
    height: 62px;
    width: 120px;

    &:first-child{
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
    } 

    
    &:last-child{
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
    }
    
    &.active{
      background: ${colors.primary};
      color: black; 
    }
`;

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <Layout>
            <Nav>
              <TabButton exact to="/" activeClassName="active">
                List
              </TabButton>
              <TabButton to="/focus" activeClassName="active">
                Focus
              </TabButton>
            </Nav>
            <Switch>
              <Route exact path="/"  >
                <ListScreen ></ListScreen>
              </Route>
              <Route path="/focus" >
                <FocusScreen ></FocusScreen>
              </Route>
            </Switch>
          </Layout>
        </TaskContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
