import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loadable from 'react-loadable';
import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import About from "./views/About.jsx";
import Gravatar from "./views/Gravatar.jsx";
import NoMatch from "./views/NoMatch.jsx";
import Lambda from './views/Lambda.jsx';

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

// class App extends Component {
const App = () => (
  <Router>
    <div className="App">
      <Header onMouseOverTopics={onMouseOverTopics} onMouseOverRepositories={onMouseOverRepositories} />

      {/* Decide page to show */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={LoadableTopics} />
        <Route path="/repositories" component={LoadableRepositories} />
        <Route path="/gravatar" component={Gravatar} />
        <Route path="/lambda" component={Lambda} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;

// import React, { Component } from "react";
// import { Grid, Navbar, Jumbotron, Button } from "react-bootstrap";

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Navbar inverse fixedTop>
//           <Grid>
//             <Navbar.Header>
//               <Navbar.Brand>
//                 <a href="/">React App</a>
//               </Navbar.Brand>
//               <Navbar.Toggle />
//             </Navbar.Header>
//           </Grid>
//         </Navbar>
//         <Jumbotron>
//           <Grid>
//             <h1>Welcome to React</h1>
//             <p>
//               <Button
//                 bsStyle="success"
//                 bsSize="large"
//                 href="http://react-bootstrap.github.io/components.html"
//                 target="_blank">
//                 View React Bootstrap Docs
//               </Button>
//             </p>
//           </Grid>
//         </Jumbotron>
//       </div>
//     );
//   }
// }

// export default App;
