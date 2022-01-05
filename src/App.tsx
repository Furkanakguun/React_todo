import React from 'react';
import { BrowserRouter ,Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import ListScreen from './screens/ListScreen';


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/"  >
        <ListScreen></ListScreen>
      </Route>
      <Route path="/focus" >
      <div>Focus View</div>
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
