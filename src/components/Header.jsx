import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import logo from "../logo.svg";

const listStyle = {
  color: "aqua"
};
const logoStyle = {
  "font-size": "60px",
  "font-family": "Georgia"
};

// class Header extends Component {
const Header = () => {
  return (
    <div>
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={logoStyle}>J|G</div>
        <h1 className="App-title">Welcome to Galante</h1>
        <ul className="menu">
          <li style={listStyle}>
            <Link to="/">Home</Link>
          </li>
          <li style={listStyle}>
            <Link to="/about">About</Link>
          </li>
          <li style={listStyle}>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
