import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query-devtools'

import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'; // CssBaseline kickstart an elegant, consistent, and simple baseline to build upon.

import Loadable from 'react-loadable';
import Header from "./components/Header";
import Home from "./views/Home";
import About from "./views/About";
import Gravatar from "./views/Gravatar";
import NoMatch from "./views/NoMatch";
import Lambda from './views/Lambda';
import LazyLoadImage from './views/LazyLoadImage';
import GridLayout from './views/GridLayout'

import styles from './App.module.css';


const LoadableTopics = Loadable({
  loader: () => import('./views/Todo'),
  loading() { return <div>Loading...</div> }
});
const LoadableGitHub = Loadable({ 
  loader: () => import('./views/GitHub/'),
  loading() { return <div>Loading...</div> }
 });

// start load topics bundle when hovering in the menu
const onMouseOverTopics = () => {
  LoadableTopics.preload();
}

const onMouseOverGitHub = () => {
  LoadableGitHub.preload();
}

// const theme = {};
// const theme = createMuiTheme({
//   palette: {
//     primary: colors.lightBlue,
//     secondary: colors.blue,
//     error: colors.pink,
//     type: 'dark',
//   },
// });
// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50'
    },
    // background: {
    //   default: '#222',
    // },
    type: 'dark',
  },
});

const App = () => (
  <Router>
    <Header onMouseOverTopics={onMouseOverTopics} onMouseOverGitHub={onMouseOverGitHub} />

    <div className={styles.layout}>
    {/* Decide page to show */}
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/todo" component={LoadableTopics} />
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Route path="/github" component={LoadableGitHub} />
      </ThemeProvider>
      <Route path="/gravatar" component={Gravatar} />
      <Route path="/lambda" component={Lambda} />
      <Route path="/lazy-load-image" component={LazyLoadImage} />
      <Route path="/grid-layout" component={GridLayout} />
      <Route component={NoMatch} />
    </Switch>
    </div>
    <ReactQueryDevtools initialIsOpen={true} />
  </Router>
);

export default App;
