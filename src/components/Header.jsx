import React from "react";
import { NavLink } from "react-router-dom";
import styles from './Header.module.css'; // Import css modules stylesheet as styles

const Header = ({onMouseOverTopics, onMouseOverRepositories}) => {
  const listStyle = { 
    color: "aqua",
    'list-style-type': 'none',
  };

  const NavItem = ({text, to}) => (
    <li style={listStyle}>
      <NavLink exact to={to} className={styles.link} activeClassName={styles.selected}>{text}</NavLink>
    </li>
  );

  return (
      <header className={styles.layout}>
        <div className={styles.logo}>J|G</div>
        <h1 className={styles.title}>Welcome to Galante</h1>
        <ul className={styles.navbar}>
          <NavItem text="Home" to="/" />
          <NavItem text="About" to="/about" />
          <NavItem text="Topics" to="/topics" />
          <NavItem text="Github - with react-query" to="/repositories" />
          <NavItem text="Gravatar" to="/gravatar" />
          <NavItem text="Lambda" to="/lambda" />
          <NavItem text="Lazy load image" to="/lazy-load-image" />
          <NavItem text="Grid layout" to="/grid-layout" />
        </ul>
      </header>
  );
};

export default Header;
