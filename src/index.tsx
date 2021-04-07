import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';

import { SelectionPage } from './components/SelectionPage';
import { LoginPage } from './components/LoginPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RacePage } from './components/RacePage';
import { Results } from './components/Results';
import { RaceListPage } from './components/RaceListPage';
import { makeStyles } from '@material-ui/core';
import bgImage from './media/f1bg.svg';

const useStyles = makeStyles((theme) => ({
  image: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      height: "100vh"
  },
}));

export const App = () => {
  const classes = useStyles();
	return(
    <div className={classes.image}>
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/race/:id">
          <RacePage />
        </Route>
        <Route exact path="/races">
          <RaceListPage />
        </Route>
        <Route path="/results/:id">
          <RacePage />
        </Route>
        <Route exact path="/frontpage">
          <SelectionPage />
        </Route>
        <Route path="/standings">
          <Results>
          </Results>
        </Route>
      </Switch>
      
    </Router>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
