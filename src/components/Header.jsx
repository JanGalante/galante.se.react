import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Header.module.css'; // Import css modules stylesheet as styles
import { text } from "body-parser";

const Header = ({onMouseOverTopics, onMouseOverRepositories}) => {
  const listStyle = { 
    color: "aqua",
    'list-style-type': 'none',
  };
  const logoStyle = {
    "fontSize": "60px",
    "fontFamily": "Georgia"
  };

  const headerStyle = {
    'background-color': '#222',
    // height: 150px;
    padding: '20px',
    color: 'white',
  }

  const navbarStyle = {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    // 'background-color': 'aqua',
    'background-color': '#333333',
  }

  const NavItem = ({text, to}) => (
    <li style={listStyle}>
      {/* <NavLink exact to={to} className="nav-bar__link" activeClassName="nav-bar__link--selected">{text}</NavLink> */}
      <NavLink exact to={to} className={styles.link} activeClassName={styles.selected}>{text}</NavLink>
    </li>
  );

  return (
    <div>
      <header className="App-header" style={headerStyle}>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div style={logoStyle}>J|G</div>
        <h1 className="App-title">Welcome to Galante</h1>
        <ul className="nav-bar" style={navbarStyle}>
          <NavItem text="Home" to="/" />
          <NavItem text="About" to="/about" />
          <NavItem text="Topics" to="/topics" />
          <NavItem text="Github" to="/repositories" />
          <NavItem text="Gravatar" to="/gravatar" />
          <NavItem text="Lambda" to="/lambda" />
          <NavItem text="Lazy load image" to="/lazy-load-image" />
          <NavItem text="Grid layout" to="/grid-layout" />
        </ul>
      </header>
    </div>
  );
};

export default Header;
