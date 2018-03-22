import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import logo from "../logo.svg";

const listStyle = {
  color: "aqua"
};

// class Header extends Component {
const Header = () => {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to Galante</h1>
      <ul>
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
  );
};

export default Header;
