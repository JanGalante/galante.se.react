import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({onMouseOverTopics, onMouseOverRepositories}) => {
  const listStyle = { color: "aqua" };
  const logoStyle = {
    "fontSize": "60px",
    "fontFamily": "Georgia"
  };

  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={logoStyle}>J|G</div>
        <h1 className="App-title">Welcome to Galante</h1>
        <ul className="nav-bar">
          <li style={listStyle}>
            <NavLink exact to="/" className="nav-bar__link" activeClassName="nav-bar__link--selected">Home</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink to="/about" className="nav-bar__link" activeClassName="nav-bar__link--selected">About</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink onMouseOver={onMouseOverTopics} to="/topics" className="nav-bar__link" activeClassName="nav-bar__link--selected">Topics</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink onMouseOver={onMouseOverRepositories} to="/repositories" className="nav-bar__link" activeClassName="nav-bar__link--selected">Github</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink to="/gravatar" className="nav-bar__link" activeClassName="nav-bar__link--selected">Gravatar</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink to="/lambda" className="nav-bar__link" activeClassName="nav-bar__link--selected">Lambda</NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
