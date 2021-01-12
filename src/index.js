import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from './pathfinding/Grid'
import {BrowserRouter, Switch} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    </Switch>
    <React.StrictMode>
      <Grid />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
