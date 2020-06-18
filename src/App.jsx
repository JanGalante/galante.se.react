import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import About from "./views/About.jsx";
import Gravatar from "./views/Gravatar.jsx";
import NoMatch from "./views/NoMatch.jsx";
import Lambda from './views/Lambda.jsx';
import LazyLoadImage from './views/LazyLoadImage';
import GridLayout from './views/GridLayout'

import styles from './App.module.css';


const LoadableTopics = Loadable({
  loader: () => import('./views/Topics.jsx'),
  loading() { return <div>Loading...</div> }
});
const LoadableRepositories = Loadable({ 
  loader: () => import('./views/Repositories.jsx'),
  loading() { return <div>Loading...</div> }
 });

// start load topics bundle when hovering in the menu
const onMouseOverTopics = () => {
  LoadableTopics.preload();
}

const onMouseOverRepositories = () => {
  LoadableRepositories.preload();
}

const App = () => (
  <Router>
    <Header onMouseOverTopics={onMouseOverTopics} onMouseOverRepositories={onMouseOverRepositories} />

    <div className={styles.layout}>
    {/* Decide page to show */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={LoadableTopics} />
      <Route path="/repositories" component={LoadableRepositories} />
      <Route path="/gravatar" component={Gravatar} />
      <Route path="/lambda" component={Lambda} />
      <Route path="/lazy-load-image" component={LazyLoadImage} />
      <Route path="/grid-layout" component={GridLayout} />
      <Route component={NoMatch} />
    </Switch>
    </div>
  </Router>
);

export default App;
