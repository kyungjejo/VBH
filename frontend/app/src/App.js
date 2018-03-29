import React from 'react';

import 'semantic-ui/dist/semantic.min.css';
import './App.css';

import Components from './components';
import Main from './main';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'


function App() {
  return(
    <div className="App">
    <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/pizza/:number" component={Components} />
      </Switch>
    </BrowserRouter>
      {/* <Components /> */}
    </div>
  )
}

export default App;
