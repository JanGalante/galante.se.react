import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";

const listStyle = {
  color: "aqua"
};
const logoStyle = {
  "fontSize": "60px",
  "fontFamily": "Georgia"
};

// class Header extends Component {
const Header = () => {
  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={logoStyle}>J|G</div>
        <h1 className="App-title">Welcome to Galante</h1>
        <ul className="nav-bar">
          <li style={listStyle}>
            {/* <NavLink className="nav-bar__link" activeClassName="nav-bar__link--selected" to="/team/1">Team 1</NavLink> */}
            <NavLink exact to="/" className="nav-bar__link" activeClassName="nav-bar__link--selected">Home</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink to="/about" className="nav-bar__link" activeClassName="nav-bar__link--selected">About</NavLink>
          </li>
          <li style={listStyle}>
            <NavLink to="/topics" className="nav-bar__link" activeClassName="nav-bar__link--selected">Topics</NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
