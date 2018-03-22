import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./views/Home.jsx";
import About from "./views/About.jsx";
import Topics from "./views/Topics.jsx";
import Header from "./components/Header.jsx";

// class App extends Component {
const App = () => (
  <Router>
    <div className="App">
      <Header />

      {/* Decide page to show */}
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
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
